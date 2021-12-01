import React, { useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import PuffLoader from "react-spinners/PuffLoader";
import { useAuth } from "../../common/hooks/useAuth";
import LogoPage from "../../common/components/LogoPage";
import useRouter from "../../common/hooks/useRouter";

export default function ConfirmEmail() {
  const { confirmEmail, isError, error, hasData } = useAuth();
  const { query, push } = useRouter();
  const autoRedirect = useRef(null);

  useEffect(() => {
    confirmEmail(query.iv, query.id);
  }, []);
  useEffect(
    () => () => autoRedirect !== null && window.clearTimeout(autoRedirect),
    [autoRedirect]
  );

  const redirect = useCallback(() => {
    autoRedirect.current = setTimeout(() => push("/"), 5000);
  }, [hasData]);

  if (hasData) {
    redirect();
    return (
      <LogoPage>
        <h2>Your account has been successfully activated</h2>
        <div>
          <h3>Browser will be automatically redirected after 5 seconds</h3>
        </div>
        <div>
          <Link to="/">Click here to immediately redirect to home</Link>
        </div>
      </LogoPage>
    );
  }

  if (isError) {
    return (
      <LogoPage>
        <h1>Some error</h1>
        <div>
          <Link to="/">Click here to redirect to homepage</Link>
        </div>
      </LogoPage>
    );
  }

  return (
    <LogoPage>
      <PuffLoader />
    </LogoPage>
  );
}
