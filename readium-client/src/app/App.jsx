import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { ToastContainer, Zoom } from "react-toastify";
import ConfirmEmail from "../screens/ConfirmEmail";
import SignInModal from "../common/components/SignInModal";
import MobileNavbar from "../common/components/Header/MobileNavbar";
import Header from "../common/components/Header";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import Page404 from "../screens/Page404";
import WritePost from "../screens/WritePost";
import PreviewPost from "../screens/PreviewPost";
import EditDraft from "../screens/EditDraft";
import EditPost from "../screens/EditPost";
import ReadPost from "../screens/ReadPost";
import Collection from "../screens/Collection";
import Notifications from "../screens/Notifications";
import ResetPassword from "../screens/ResetPassword";
import Settings from "../screens/Settings";
import SecureRoute from "../common/components/SecureRoute";
import "./App.css";

function App() {
  return (
    <Switch>
      <Route path="/auth/confirm">
        <ConfirmEmail />
      </Route>
      <Route path="/auth/reset">
        <ResetPassword />
      </Route>
      <Route path="/404">
        <Page404 />
      </Route>
      <Route>
        <SignInModal />
        <MobileNavbar />
        <Header />
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          transition={Zoom}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <SecureRoute path="/write">
            <WritePost />
          </SecureRoute>
          <SecureRoute path="/preview">
            <PreviewPost />
          </SecureRoute>
          <SecureRoute path="/edit/draft">
            <EditDraft />
          </SecureRoute>
          <SecureRoute path="/edit/post">
            <EditPost />
          </SecureRoute>
          <Redirect from="/post/:postId/reload" to="/post/:postId" />
          <Route path="/post/:postId">
            <ReadPost />
          </Route>
          <SecureRoute path="/settings">
            <Settings />
          </SecureRoute>
          <SecureRoute path="/profile/:profileId?">
            <Profile />
          </SecureRoute>
          <SecureRoute path="/collections">
            <Collection />
          </SecureRoute>
          <SecureRoute path="/notifications">
            <Notifications />
          </SecureRoute>
          <Route path="*">
            <Redirect to="/404" />
          </Route>
        </Switch>
      </Route>
    </Switch>
  );
}

export default App;
