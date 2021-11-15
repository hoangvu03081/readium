import React, { useState, useRef, useEffect } from "react";
import { Clickable, AvatarImage } from "./styles";
import AvatarDropdown from "./AvatarDropdown";

export default function Avatar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef();
  const handleToggleDropdown = () => setShowDropdown(!showDropdown);
  useEffect(() => {
    const isOutsideClicked = (e) => {
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
  }, [showDropdown]);

  return (
    <div style={{ position: "relative" }} ref={dropdownRef}>
      <Clickable onClick={handleToggleDropdown}>
        <AvatarImage src="https://i.pravatar.cc/150?img=47" alt="Avatar" />
      </Clickable>
      {showDropdown && (
        <AvatarDropdown handleToggleDropdown={handleToggleDropdown} />
      )}
    </div>
  );
}
