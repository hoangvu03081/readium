import React, { useState, useRef, useEffect } from "react";
import { Clickable, AvatarImage } from "./styles";
import AvatarDropdown from "./AvatarDropdown";
import useAvatar from "../../api/useAvatar";

export default function Avatar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef();
  const handleToggleDropdown = () => setShowDropdown(!showDropdown);
  const avatarQuery = useAvatar();
  useEffect(() => {
    const isOutsideClicked = (e) => {
      if (!avatarQuery.data) return;
      if (
        showDropdown &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      )
        handleToggleDropdown();
    };

    document.addEventListener("mousedown", isOutsideClicked);

    return () => {
      document.removeEventListener("mousedown", isOutsideClicked);
    };
  }, [showDropdown, avatarQuery]);

  if (!avatarQuery.data) {
    return <AvatarImage src="https://ui-avatars.com/api/" alt="Avatar" />;
  }

  return (
    <div style={{ position: "relative" }} ref={dropdownRef}>
      <Clickable onClick={handleToggleDropdown}>
        <AvatarImage src={avatarQuery.data} alt="Avatar" />
      </Clickable>
      {showDropdown && (
        <AvatarDropdown handleToggleDropdown={handleToggleDropdown} />
      )}
    </div>
  );
}
