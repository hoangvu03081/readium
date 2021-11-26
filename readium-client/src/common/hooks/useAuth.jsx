import axios from "axios";
import PropTypes from "prop-types";
import React, { useState, useEffect, useContext, createContext } from "react";
import { useDispatch } from "react-redux";
import { modalClosed } from "../../slices/sign-in-slice";

const isDev = process.env.NODE_ENV === "development";
const LOCAL_URL = "http://localhost:5000";
const HOST_URL = "";

function getURL(endpoint) {
  return isDev ? LOCAL_URL + endpoint : HOST_URL + endpoint;
}

const REGISTER_API = getURL("/auth/register");
const LOGOUT_API = getURL("/auth/logout");
const LOGIN_API = getURL("/auth");
const CONFIRM_API = (iv, id) => `${getURL("/auth/confirm")}?iv=${iv}&id=${id}`;
const FACEBOOK_API = getURL("/auth/facebook");
const GOOGLE_API = getURL("/auth/google");
const FORGET_API = getURL("/auth/forget");
const RESET_API = getURL("/auth/reset");

const authContext = createContext();

export function useAuth() {
  return useContext(authContext);
}

function useProvideAuth() {
  const [isAuth, setAuth] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [hasData, setHasData] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [tokenReceived, setTokenReceived] = useState(false);
  const dispatch = useDispatch();

  const handleData = (d) => {
    setData(d);
    setHasData(true);
  };

  const handleError = (e) => {
    setError(e);
    setIsError(true);
  };

  const handleToken = (t) => {
    axios.defaults.headers.common.Authorization = t;
    localStorage.setItem("Authorization", t);
    setTokenReceived(true);
  };

  useEffect(async () => {
    try {
      axios.defaults.withCredentials = true;

      const token = localStorage.getItem("Authorization");
      if (token) axios.defaults.headers.common.Authorization = token;

      await axios.get(`${LOCAL_URL}/users/protected`);
      setAuth(true);
    } catch (e) {
      setAuth(false);
    } finally{
      setTokenReceived(false);
    }
  }, [tokenReceived]);

  const clearState = () => {
    setLoading(false);
    setIsError(false);
    setHasData(false);
    setError(null);
    setData(null);
  };

  const signOut = async () => {
    try {
      clearState();
      await axios.get(LOGOUT_API);
      localStorage.removeItem("Authorization");
      axios.defaults.headers.common.Authorization = null;
      setAuth(false);
    } catch (e) {
      setError(e);
    }
  };

  const signIn = async (email, password) => {
    try {
      clearState();
      setLoading(true);
      const response = await axios.post(LOGIN_API, {
        email,
        password,
      });
      console.log(response);
      const { token } = response.data;
      handleToken(token);
      dispatch(modalClosed());
    } catch (e) {
      setError(e.data.message);
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email, password) => {
    try {
      clearState();
      setLoading(true);
      const response = await axios.post(REGISTER_API, {
        email,
        password,
      });
      handleData(response.data.message);
    } catch (e) {
      handleError(e.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      clearState();
      window.location.href = GOOGLE_API;
    } catch (e) {
      console.error(e);
    }
  };

  const signInWithFacebook = async () => {
    try {
      clearState();
      window.location.href = FACEBOOK_API;
    } catch (e) {
      console.error(e);
    }
  };

  const confirmEmail = async (iv, id) => {
    try {
      console.log("ALOHA");
      clearState();
      setLoading(true);
      const response = await axios.get(CONFIRM_API(iv, id));
      handleData(true);
      handleToken(response.data.token);
    } catch (e) {
      setIsError(true);
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return {
    isAuth,
    isLoading,
    isError,
    hasData,
    data,
    error,
    signIn,
    signUp,
    signOut,
    signInWithGoogle,
    signInWithFacebook,
    confirmEmail,
    clearState,
  };
}

export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
