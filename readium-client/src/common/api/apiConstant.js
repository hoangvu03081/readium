const isDev = process.env.NODE_ENV === "development";
const LOCAL_URL = "http://localhost:5000";
const HOST_URL = "";

export default function getURL(endpoint) {
  return isDev ? LOCAL_URL + endpoint : HOST_URL + endpoint;
}

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
};

const SETTING_API = {
  GET_MY_PROFILE: getURL("/users/profiles"),
  PATCH_MY_PROFILE: getURL("/users/profiles"),
};

const POST_API = {
  GET_POST: (pageParam) => getURL(`/posts/?skip=${pageParam}`),
};

export { USER_API, PROFILE_API, POST_API, SETTING_API };
