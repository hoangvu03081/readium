import axios from "axios";
import PropTypes from "prop-types";
import React, { useState, useEffect, useContext, createContext } from "react";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { modalClosed } from "../../slices/sign-in-slice";

const isDev = process.env.NODE_ENV === "development";
const LOCAL_URL = "http://localhost:5000";

function getURL(endpoint) {
  return isDev ? LOCAL_URL + endpoint : "";
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
  const [cookies, setCookie, removeCookie] = useCookies();
  const dispatch = useDispatch();

  useEffect(() => {
    axios.defaults.headers.common.Authorization = cookies.Authorization;
    axios.get(LOCAL_URL + "/users/protected", { withCredentials: true });
  }, [isAuth]);

  const clearState = () => {
    setLoading(false);
    setIsError(false);
    setHasData(false);
    setError(null);
    setData(null);
  };

  const signIn = async (email, password) => {
    try {
      clearState();
      setLoading(true);
      const response = await axios.post(LOGIN_API, {
        email,
        password,
      });

      //TODO: parse expires?
      const { token } = response.data.token;

      const expireTime = new Date(Date.now());
      expireTime.setDate(expireTime.getDate() + 3600);

      setCookie("Authorization", token, {
        expires: expireTime,
        // httpOnly: true,
      });
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

  return {
    isAuth,
    isLoading,
    isError,
    hasData,
    data,
    error,
    signIn,
    signUp,
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
