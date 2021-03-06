const isDev = process.env.NODE_ENV === "development";
const LOCAL_URL = "http://localhost:5000";
const HOST_URL = "";
const WEBSOCKET = "ws://localhost:5000";

export default function getURL(endpoint) {
  return isDev ? LOCAL_URL + endpoint : HOST_URL + endpoint;
}

const SEARCH_API = {
  POST_SEARCH: getURL("/search"),
};

const USER_API = {
  GET_AVATAR: (id) => getURL(`/users/profiles/avatar/${id}`),
  GET_MY_AVATAR: getURL(`/users/profiles/avatar/`),
  GET_IS_FOLLOW: (id) => getURL(`/users/follow/${id}`),
  POST_FOLLOW: (id) => getURL(`/users/follow/${id}`),
};

const PROFILE_API = {
  GET_PROFILE: (profileId) => getURL(`/users/profiles/${profileId}`),
  GET_COVER_IMAGE: (userId) => getURL(`/users/profiles/cover-image/${userId}`),
  GET_MY_COVER_IMAGE: getURL("/users/profiles/cover-image)"),
  POST_UPLOAD_AVATAR: getURL("/users/profiles/avatar"),
  POST_UPLOAD_COVER_IMAGE: getURL("/users/profiles/cover-image"),
  GET_MY_PROFILE: getURL(`/users/profiles`),
};

const SETTING_API = {
  GET_MY_PROFILE: getURL("/users/profiles"),
  PATCH_MY_PROFILE: getURL("/users/profiles"),
  GET_RESET_PASSWORD: getURL("/auth/reset"),
};

const POST_API = {
  GET_PROFILE_POST: (userId, skip = 0) =>
    getURL(`/posts/user/${userId}?skip=${skip}`),
  GET_POPULAR_POST: getURL(`/posts/popular`),
  GET_POSTS: (pageParam) => getURL(`/posts/?skip=${pageParam}`),
  GET_FOLLOWING_POSTS: (pageParam) =>
    getURL(`/users/following/posts/?skip=${pageParam}`),
  GET_A_POST: (id) => getURL(`/posts/${id}`),
  GET_COVER_IMAGE_POST: (id) => getURL(`/posts/${id}/cover-image`),
  EDIT_POST: (postId) => getURL(`/drafts/${postId}`),
  DELETE_POST: (postId) => getURL(`/posts/${postId}`),
};

const DRAFT_API = {
  GET_MY_DRAFT: (skip = 0) => getURL(`/drafts/?skip=${skip}`),
  POST_DRAFT_ID: getURL("/drafts"),
  PUT_TITLE: (id) => getURL(`/drafts/${id}/title`),
  PUT_DESCRIPTION: (id) => getURL(`/drafts/${id}/description`),
  PUT_TAGS: (id) => getURL(`/drafts/${id}/tags`),
  PUT_COVER_IMAGE: (id) => getURL(`/drafts/${id}/cover-image`),
  PATCH_CONTENT: (id) => getURL(`/drafts/${id}/diff`),
  GET_A_DRAFT: (id) => getURL(`/drafts/${id}`),
  GET_COVER_IMAGE_DRAFT: (id) => getURL(`/drafts/${id}/cover-image`),
  PUT_PUBLISH: (id) => getURL(`/drafts/${id}/publish`),
  DELETE_DRAFT: (id) => getURL(`/drafts/${id}`),
};

const LIKE_API = {
  POST_LIKE: (postId) => getURL(`/posts/${postId}/like`),
  GET_IS_LIKED: (postId) => getURL(`/users/is-like/${postId}`),
};

const COMMENT_API = {
  GET_MY_AVATAR: getURL(`/users/profiles/avatar/`),
  POST_COMMENT: (postId) => getURL(`/posts/${postId}/comments`),
  GET_COMMENT: (postId) => getURL(`/posts/${postId}/comments/`),
};

const COLLECTION_API = {
  GET_ALL_COLLECTION: getURL(`/users/collections/`),
  POST_COLLECTION: getURL(`/users/collections/`),
  POST_POST_COLLECTION: getURL(`/users/collections/posts`),
  PUT_COLLECTION_NAME: (collectionId) =>
    getURL(`/users/collections/${collectionId}/name`),
  DELETE_POST_COLLECTION: getURL(`/users/collections/posts`),
  DELETE_COLLECTION: (collectionId) =>
    getURL(`/users/collections/${collectionId}`),
};

const OTHER_API = {
  GET_TRENDING_TOPICS: getURL(`/topics/trending`),
  GET_RECOMMENDED_WRITERS: getURL(`/users/recommended`),
};

export {
  USER_API,
  PROFILE_API,
  POST_API,
  SETTING_API,
  DRAFT_API,
  LIKE_API,
  COMMENT_API,
  COLLECTION_API,
  SEARCH_API,
  OTHER_API,
  WEBSOCKET,
};
