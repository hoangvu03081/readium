import React from "react";
import { isMobile } from "react-device-detect";
import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";
import { useAuth } from "../../hooks/useAuth";

export default function Header() {
  const { isAuth } = useAuth();
  return isMobile ? (
    <MobileHeader isLogin={isAuth} />
  ) : (
    <DesktopHeader isLogin={isAuth} />
  );
}
