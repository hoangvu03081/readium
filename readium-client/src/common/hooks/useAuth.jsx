import axios from "axios";
import PropTypes from "prop-types";
import React, { useState, useEffect, useContext, createContext } from "react";
import { useDispatch } from "react-redux";
import { modalClosed } from "../../slices/sign-in-slice";
// import useRouter from "./useRouter";
import useRouter from "./useRouter";

const isDev = process.env.NODE_ENV === "development";
const LOCAL_URL = "http://localhost:5000";
const HOST_URL = "";

function getURL(endpoint) {
  return isDev ? LOCAL_URL + endpoint : HOST_URL + endpoint;
}

const REGISTER_API = getURL("/auth/register");
const LOGOUT_API = getURL("/auth/logout");
const LOGIN_API = getURL("/auth");
const CONFIRM_API = getURL("/auth/confirm");
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
  const dispatch = useDispatch();
  const { replace } = useRouter();

  useEffect(async () => {
    try {
      const token = localStorage.getItem("Authorization");
      if (token) {
        axios.defaults.headers.common.Authorization = token;
        await axios.get(`${LOCAL_URL}/users/protected`);
        setAuth(true);
      }
    } catch (e) {
      setAuth(false);
    }
  }, []);

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

      const { token } = response.data;
      localStorage.setItem("Authorization", token);

      setAuth(true);
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
      setData(response.data.message);
      setHasData(true);
    } catch (e) {
      setError(e.response.data.message);
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    clearState();
    window.location.href = GOOGLE_API;
  };

  const signInWithFacebook = async () => {
    clearState();
    window.location.href = FACEBOOK_API;
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
