import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileDropdown from "./ProfileDropdown"; // дропдаун
import "./SettingsPage.css";

const defaultSettings = {
  theme: "light",
  language: "pt",
  notifyLikes: true,
  notifyComments: true,
  notifyFollows: true,
  postPrivacy: "public",
  privateProfile: false,
};

export default function SettingsPage() {
  const navigate = useNavigate();

  // Завантаження з localStorage або дефолтних налаштувань
  const storedSettings = JSON.parse(localStorage.getItem("userSettings")) || defaultSettings;
  const [settings, setSettings] = useState(storedSettings);
  const [tempSettings, setTempSettings] = useState(storedSettings);

  const translations = {
    pt: {
      settings: "Configurações",
      theme: "Tema",
      language: "Idioma",
      notifications: "Notificações",
      likes: "Gostos nas publicações",
      comments: "Comentários",
      followers: "Novos seguidores",
      postPrivacy: "Privacidade das publicações",
      profile: "Perfil",
      privateProfile: "Perfil privado",
      security: "Segurança",
      logoutAll: "Sair de todos os dispositivos",
      enable2FA: "Ativar 2FA",
      back: "Voltar",
      reset: "Repor",
      save: "Guardar",
      themes: { light: "Modo Claro", dark: "Modo Escuro", grey: "Modo Cinzento" },
      languages: { en: "Inglês", es: "Espanhol", pt: "Português", fr: "Francês", uk: "Ucraniano" },
      postPrivacyOptions: { public: "Público", friends: "Somente Amigos", private: "Privado" },
    },
    en: {
      settings: "Settings",
      theme: "Theme",
      language: "Language",
      notifications: "Notifications",
      likes: "Likes on Posts",
      comments: "Comments",
      followers: "New Followers",
      postPrivacy: "Post Privacy",
      profile: "Profile",
      privateProfile: "Private Profile",
      security: "Security",
      logoutAll: "Log out from all devices",
      enable2FA: "Enable 2FA",
      back: "Back",
      reset: "Reset",
      save: "Save",
      themes: { light: "Light", dark: "Dark", grey: "Grey" },
      languages: { en: "English", es: "Spanish", pt: "Portuguese", fr: "French", uk: "Ukrainian" },
      postPrivacyOptions: { public: "Public", friends: "Friends Only", private: "Private" },
    },
    uk: {
      settings: "Налаштування",
      theme: "Тема",
      language: "Мова",
      notifications: "Сповіщення",
      likes: "Лайки на постах",
      comments: "Коментарі",
      followers: "Нові підписники",
      postPrivacy: "Приватність постів",
      profile: "Профіль",
      privateProfile: "Приватний профіль",
      security: "Безпека",
      logoutAll: "Вийти з усіх пристроїв",
      enable2FA: "Активувати 2FA",
      back: "Назад",
      reset: "Скинути",
      save: "Зберегти",
      themes: { light: "Світла", dark: "Темна", grey: "Сіра" },
      languages: { en: "Англійська", es: "Іспанська", pt: "Португальська", fr: "Французька", uk: "Українська" },
      postPrivacyOptions: { public: "Публічно", friends: "Тільки друзі", private: "Приватно" },
    },
  };

  const lang = translations[settings.language] || translations.pt;

  const saveSettings = () => {
    setSettings({ ...tempSettings });
    localStorage.setItem("userSettings", JSON.stringify(tempSettings));
  };

  const resetSettings = () => {
    setTempSettings(defaultSettings);
    setSettings(defaultSettings);
    localStorage.setItem("userSettings", JSON.stringify(defaultSettings));
  };

  const enable2FA = () => alert(lang.enable2FA);
  const logoutAll = () => alert(lang.logoutAll);

  return (
    <div className={`settings-wrapper theme-${settings.theme}`}>
      {/* --- Хідер з дропдауном --- */}
      <div
        className="settings-header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 20px",
        }}
      >
        <div className="header-left">DearMe</div>
        <div className="header-center">{lang.settings}</div>
        <div className="header-right">
          <ProfileDropdown /> {/* дропдаун */}
        </div>
      </div>

      <div className="settings-container full-screen">
        <div className="settings-columns">
          <div className="settings-column">
            {/* Theme */}
            <section className="settings-section">
              <h3>{lang.theme}</h3>
              <select
                value={tempSettings.theme}
                onChange={(e) =>
                  setTempSettings({ ...tempSettings, theme: e.target.value })
                }
              >
                {Object.entries(lang.themes).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </section>

            {/* Language */}
            <section className="settings-section">
              <h3>{lang.language}</h3>
              <select
                value={tempSettings.language}
                onChange={(e) =>
                  setTempSettings({ ...tempSettings, language: e.target.value })
                }
              >
                {Object.entries(lang.languages).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </section>

            {/* Notifications */}
            <section className="settings-section">
              <h3>{lang.notifications}</h3>
              {["Likes", "Comments", "Followers"].map((key, i) => {
                const labels = [lang.likes, lang.comments, lang.followers];
                return (
                  <label key={i} className="settings-toggle">
                    <span>{labels[i]}</span>
                    <input
                      type="checkbox"
                      checked={tempSettings[`notify${key}`]}
                      onChange={() =>
                        setTempSettings({
                          ...tempSettings,
                          [`notify${key}`]: !tempSettings[`notify${key}`],
                        })
                      }
                    />
                  </label>
                );
              })}
            </section>
          </div>

          <div className="settings-column">
            {/* Post Privacy */}
            <section className="settings-section">
              <h3>{lang.postPrivacy}</h3>
              <select
                value={tempSettings.postPrivacy}
                onChange={(e) =>
                  setTempSettings({ ...tempSettings, postPrivacy: e.target.value })
                }
              >
                {Object.entries(lang.postPrivacyOptions).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </section>

            {/* Profile */}
            <section className="settings-section">
              <h3>{lang.profile}</h3>
              <label className="settings-toggle">
                <span>{lang.privateProfile}</span>
                <input
                  type="checkbox"
                  checked={tempSettings.privateProfile}
                  onChange={() =>
                    setTempSettings({
                      ...tempSettings,
                      privateProfile: !tempSettings.privateProfile,
                    })
                  }
                />
              </label>
            </section>

            {/* Security */}
            <section className="settings-section settings-security">
              <button className="btn-authenticator" onClick={enable2FA}>
                {lang.enable2FA}
              </button>
              <button className="btn-logout-all" onClick={logoutAll}>
                {lang.logoutAll}
              </button>
            </section>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="settings-buttons footer-buttons">
          <button
            className="btn-back"
            onClick={(e) => {
              e.preventDefault();
              navigate("/profile-dropdown"); // завжди на ProfileDropdown
            }}
          >
            {lang.back}
          </button>
          <button className="btn-reset" onClick={resetSettings}>
            {lang.reset}
          </button>
          <button className="btn-save" onClick={saveSettings}>
            {lang.save}
          </button>
        </div>
      </div>
    </div>
  );
}
