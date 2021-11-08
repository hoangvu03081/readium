import React from "react";
import { isMobile } from "react-device-detect";
import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";

export default function Header() {
  return isMobile ? (
    <MobileHeader isLogin={false} />
  ) : (
    <DesktopHeader isLogin={false} />
  );
}
