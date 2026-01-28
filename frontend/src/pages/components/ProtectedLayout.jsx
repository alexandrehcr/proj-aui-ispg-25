// src/components/ProtectedLayout.jsx
import React from "react";
import ProfileDropdown from "../pages/components/ProfileDropdown"; // твої компоненти
import "./ProtectedLayout.css"; // стилі для layout

const ProtectedLayout = ({ children }) => {
  // Тут можна додати логіку перевірки авторизації
  // Наприклад, якщо user не авторизований — редірект на /auth
  const isLoggedIn = true; // тимчасово, пізніше підставиш стан з auth

  if (!isLoggedIn) {
    return <p>Access denied. Please log in.</p>;
  }

  return (
    <div className="protected-layout">
      <header className="protected-header">
        <h1>My App Header</h1>
        <ProfileDropdown />
      </header>
      <main className="protected-content">{children}</main>
    </div>
  );
};

export default ProtectedLayout;
