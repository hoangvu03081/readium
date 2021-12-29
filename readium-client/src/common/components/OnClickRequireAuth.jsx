import React from "react";
import { useDispatch } from "react-redux";
import { useAuth } from "../hooks/useAuth";
import { modalOpened } from "../../slices/sign-in-slice";

export default function OnClickRequireAuth({ children }) {
  const dispatch = useDispatch();
  const { auth } = useAuth();

  if (!auth)
    return (
      <>
        {React.cloneElement(children, {
          onClick: (e) => e.preventDefault() || dispatch(modalOpened()),
        })}
      </>
    );
  return <>{children}</>;
}
