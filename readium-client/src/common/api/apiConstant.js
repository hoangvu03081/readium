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
  GET_MY_PROFILE: getURL("/users/profiles"),
  GET_PROFILE: (profileId) => getURL(`/users/profiles/${profileId}`),
};

const POST_API = {
  GET_POST: (pageParam) => getURL(`/posts/?skip=${pageParam}`),
};

export { USER_API, PROFILE_API, POST_API };
