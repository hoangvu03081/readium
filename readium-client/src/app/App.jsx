import React, { Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { ToastContainer, Zoom } from "react-toastify";
import Loading from "../common/components/Loading";
import SecureRoute from "../common/components/SecureRoute";
import "./App.css";

const ConfirmEmail = React.lazy(() => "../screens/ConfirmEmail");
const SignInModal = React.lazy(() => "../common/components/SignInModal");
const MobileNavbar = React.lazy(
  () => "../common/components/Header/MobileNavbar"
);
const Header = React.lazy(() => "../common/components/Header");
const Home = React.lazy(() => "../screens/Home");
const Profile = React.lazy(() => "../screens/Profile");
const Page404 = React.lazy(() => "../screens/Page404");
const WritePost = React.lazy(() => "../screens/WritePost");
const PreviewPost = React.lazy(() => "../screens/PreviewPost");
const EditDraft = React.lazy(() => "../screens/EditDraft");
const EditPost = React.lazy(() => "../screens/EditPost");
const ReadPost = React.lazy(() => "../screens/ReadPost");
const Collection = React.lazy(() => "../screens/Collection");
const Notifications = React.lazy(() => "../screens/Notifications");
const ResetPassword = React.lazy(() => "../screens/ResetPassword");
const Settings = React.lazy(() => "../screens/Settings");
const SearchPage = React.lazy(() => "../screens/SearchPage");

function App() {
  return (
    <Suspense fallback={Loading}>
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
            <Route path="/search">
              <SearchPage />
            </Route>
            <SecureRoute path="/write">
              <WritePost />
            </SecureRoute>
            <SecureRoute path="/preview/:draftId">
              <PreviewPost />
            </SecureRoute>
            <SecureRoute path="/edit/draft/:draftId">
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
    </Suspense>
  );
}

export default App;
