import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfileDropdown.css";

export default function ProfileDropdown() {
  const [open, setOpen] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const navigate = useNavigate();
  const dropdownRef = useRef();

useEffect(() => {
  const profileData = JSON.parse(localStorage.getItem("profileData"));
  const username = localStorage.getItem("username");

  if (profileData) {
    setAvatar(profileData.avatar || null);
    setName(profileData.name || "");
    setSurname(profileData.surname || "");
  } else if (username) {
    setName(username);
    setSurname("");
  }
}, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const goProfile = () => {
    setOpen(false);
    navigate("/profile");
  };

  const goConta = () => {
    setOpen(false);
    navigate("/conta"); // ✅ СТОРІНКА CONTA
  };

  const goSettings = () => {
    setOpen(false);
    navigate("/settings");
  };

  const handleLogout = () => {
    setOpen(false);
    localStorage.removeItem("profileData");
    navigate("/");
  };

  return (
    <div className="dropdown-container" ref={dropdownRef}>
      <button className="dropdown-btn" onClick={() => setOpen(!open)}>
        <img
          src={avatar || "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"}
          alt="Avatar"
          className="dropdown-avatar"
        />
        <span className="dropdown-name">
          {name || "Utilizador"} {surname}
        </span>
      </button>

      {open && (
        <div className="dropdown-menu">
          <div className="dropdown-item" onClick={goProfile}>
            Editar Perfil
          </div>

          <div className="dropdown-item" onClick={goConta}>
            Conta
          </div>

          <div className="dropdown-item" onClick={goSettings}>
            Configurações
          </div>

          <div className="dropdown-item exit" onClick={handleLogout}>
            Sair
          </div>
        </div>
      )}
    </div>
  );
}
