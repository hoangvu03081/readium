const { Client } = require("@elastic/elasticsearch");

const client = new Client({
  node: "http://elasticsearch:9200",
  requestTimeout: 120000,
  maxRetries: 3,
});

const initialSetup = setInterval(() => {
  client.cluster.health({}, (error, result) => {
    if (error) {
      console.error(error);
      return;
    }
    mappingIndex();
    clearInterval(initialSetup);
  });
}, 5000);

function mappingIndex() {
  client.indices
    .get({
      index: "post",
    })
    .catch(() => {
      createPostMapping();
    });
  client.indices.get({ index: "user" }).catch(() => {
    createUserMapping();
  });
}

function createPostMapping() {
  client.indices.create({
    index: "post",
    body: {
      mappings: {
        properties: {
          title: {
            type: "text",
            analyzer: "autocomplete",
          },
          tags: {
            type: "text",
            analyzer: "tag_autocomplete",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256,
              },
            },
          },
          isPublished: {
            type: "boolean",
          },
          author: {
            type: "keyword",
          },
          views: {
            type: "integer",
          },
          likes: {
            type: "integer",
          },
          comments: {
            type: "integer",
          },
          lastEdit: {
            type: "date",
          },
          publishDate: {
            type: "date",
          },
          duration: {
            type: "integer",
          },
        },
      },
      settings: {
        number_of_shards: 1,
        analysis: {
          filter: {
            autocomplete_filter: {
              type: "edge_ngram",
              min_gram: 2,
              max_gram: 20,
            },
          },
          analyzer: {
            autocomplete: {
              type: "custom",
              tokenizer: "standard",
              filter: ["lowercase", "autocomplete_filter"],
            },
            tag_autocomplete: {
              type: "custom",
              tokenizer: "keyword",
              filter: ["lowercase", "autocomplete_filter"],
            },
          },
        },
      },
    },
  });
}

function createUserMapping() {
  client.indices.create({
    index: "user",
    body: {
      mappings: {
        properties: {
          displayName: {
            type: "text",
            analyzer: "autocomplete",
          },
        },
      },
      settings: {
        number_of_shards: 1,
        analysis: {
          filter: {
            autocomplete_filter: {
              type: "edge_ngram",
              min_gram: 2,
              max_gram: 20,
            },
          },
          analyzer: {
            autocomplete: {
              type: "custom",
              tokenizer: "standard",
              filter: ["lowercase", "autocomplete_filter"],
            },
          },
        },
      },
    },
  });
}

function putPost(postId, post) {
  return client.index({
    id: postId,
    index: "post",
    body: post,
  });
}

function putUser(userId, user) {
  return client.index({
    id: userId,
    index: "user",
    body: user,
  });
}

function search(text = "", tag = "") {
  return client.search({
    index: ["post", "user"],
    body: {
      query: {
        bool: {
          should: [
            {
              match: {
                tags: tag,
              },
            },
            {
              match: {
                title: text,
              },
            },
            {
              match: {
                displayName: text,
              },
            },
          ],
        },
      },
    },
  });
}

function getTrendingTopics(dayRange = 1) {
  return client.search({
    index: ["post"],
    body: {
      size: 0,
      aggs: {
        time_range: {
          date_range: {
            field: "publishDate",
            ranges: [
              {
                from: `now-${dayRange}d/d`,
                to: "now",
              },
            ],
          },
          aggs: {
            popular_tags: {
              terms: { field: "tags.keyword" },
            },
          },
        },
      },
    },
  });
}

function deletePost(id) {
  return client.delete({
    id,
    index: "post",
  });
}

const SortType = {
  ASCENDING: "asc",
  DESCENDING: "desc",
};

const PostSortField = {
  VIEWS: "views",
  LIKES: "likes",
  COMMENTS: "comments",
  PUBLISH_DATE: "publishDate",
};

function searchProfilePost(
  query,
  authorId,
  tags,
  sortType = SortType.DESCENDING,
  sortField = PostSortField.PUBLISH_DATE,
  skip = 0
) {
  return client.search({
    index: "post",
    body: {
      from: skip,
      size: 5,
      sort: [
        {
          [sortField]: sortType,
        },
      ],
      query: {
        bool: {
          must: [
            {
              match: {
                author: authorId,
              },
            },
            ...(tags && {
              match: {
                tags: tags,
              },
            }),
            {
              match: {
                isPublished: true,
              },
            },
          ],
          should: [
            {
              match: {
                title: query,
              },
            },
          ],
        },
      },
    },
  });
}

const DraftSortField = {
  LAST_EDIT: "lastEdit",
  DURATION: "duration",
};

function searchProfileDraft(
  query,
  authorId,
  sortType = SortType.DESCENDING,
  sortField = DraftSortField.LAST_EDIT,
  skip=0
) {
  return client.search({
    index: "post",
    body: {
      from: skip,
      size: 5,
      sort: [
        {
          [sortField]: sortType,
        },
      ],
      query: {
        bool: {
          must: [
            {
              match: {
                author: authorId,
              },
            },
            {
              match: {
                isPublished: false,
              },
            },
          ],
          should: [
            {
              match: {
                title: query,
              },
            },
          ],
        },
      },
    },
  });
}

getTrendingTopics(1).then((data) => console.log(data));

function deleteUser(id) {
  return client.delete({
    id,
    index: "user",
  });
}

module.exports = {
  putPost,
  putUser,
  deletePost,
  deleteUser,
  search,
  getTrendingTopics,
  DraftSortField,
  PostSortField,
  SortType,
  searchProfileDraft,
  searchProfilePost
};
