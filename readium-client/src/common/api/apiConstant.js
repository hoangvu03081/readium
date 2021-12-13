const isDev = process.env.NODE_ENV === "development";
const LOCAL_URL = "http://localhost:5000";
const HOST_URL = "";
const WEBSOCKET = "ws://localhost:5000";

export default function getURL(endpoint) {
  return isDev ? LOCAL_URL + endpoint : HOST_URL + endpoint;
}

const USER_API = {
  GET_AVATAR: (id) => getURL(`/users/profiles/avatar/${id}`),
  GET_MY_AVATAR: getURL(`/users/profiles/avatar/`),
};

const PROFILE_API = {
  GET_MY_PROFILE: getURL("/users/profiles"),
};

const POST_API = {
  GET_POST: (pageParam) => getURL(`/posts/?skip=${pageParam}`),
};

const DRAFT_API = {
  PUT_TITLE: (id) => getURL(`/drafts/${id}/title`),
  PUT_DESCRIPTION: (id) => getURL(`/drafts/${id}/description`),
  PUT_TAGS: (id) => getURL(`/drafts/${id}/tags`),
  PUT_COVER_IMAGE: (id) => getURL(`/drafts/${id}/cover-image`),
  PATCH_CONTENT: (id) => getURL(`/drafts/${id}/diff`),
};

export { USER_API, PROFILE_API, POST_API, DRAFT_API, WEBSOCKET };
