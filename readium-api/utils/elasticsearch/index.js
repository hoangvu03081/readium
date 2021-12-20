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

function search(text, tag) {
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

function deletePost(id) {
  return client.delete({
    id,
    index: "post"
  })
}

function deleteUser(id) {
  return client.delete({
    id,
    index: "user"
  })
}

module.exports = {
  putPost,
  putUser,
  deletePost,
  deleteUser,
  search
};
