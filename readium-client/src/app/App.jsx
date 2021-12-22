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
import ResetPassword from "../screens/ResetPassword";
import "./App.css";
import Settings from "../screens/Settings";
import SecureRoute from "../common/components/SecureRoute";

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
          <SecureRoute path="/post/:postId?">
            <ReadPost />
          </SecureRoute>
          <SecureRoute path="/settings">
            <Settings />
          </SecureRoute>
          <SecureRoute path="/profile/:profileId?">
            <Profile />
          </SecureRoute>
          <Route path="/notifications">notifications</Route>
          <Route path="/collections">collections</Route>
          <Route path="/tag">tag</Route>
          <Route path="*">
            <Redirect to="/404" />
          </Route>
        </Switch>
      </Route>
    </Switch>
  );
}

export default App;
