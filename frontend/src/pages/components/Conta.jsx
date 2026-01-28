import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileDropdown from "./ProfileDropdown"; // дропдаун
import "./Conta.css";

export default function Conta() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [settings, setSettings] = useState({ theme: "light", language: "pt" });

  // Переклади
  const translations = {
    pt: {
      myProfile: "Meu Perfil",
      gender: "Género",
      dob: "Data de Nascimento",
      country: "País",
      city: "Cidade",
      lastPosts: "Últimos posts",
      noBio: "Sem biografia",
      back: "Voltar",
      edit: "Editar Perfil",
      male: "Masculino",
      female: "Feminino",
    },
    en: {
      myProfile: "My Profile",
      gender: "Gender",
      dob: "Date of Birth",
      country: "Country",
      city: "City",
      lastPosts: "Last posts",
      noBio: "No bio",
      back: "Back",
      edit: "Edit Profile",
      male: "Male",
      female: "Female",
    },
    uk: {
      myProfile: "Мій профіль",
      gender: "Стать",
      dob: "Дата народження",
      country: "Країна",
      city: "Місто",
      lastPosts: "Останні пости",
      noBio: "Без біографії",
      back: "Назад",
      edit: "Редагувати профіль",
      male: "Чоловіча",
      female: "Жіноча",
    },
  };

  const t = translations[settings.language] || translations.pt;

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("profileData"));
    setProfile(data || {});
    setPosts(data?.posts || []);

    const userSettings = JSON.parse(localStorage.getItem("userSettings"));
    if (userSettings) {
      setSettings(userSettings);
    }
  }, []);

  if (!profile) return <div>Carregando...</div>;

  const totalSlots = 6;

  return (
    <div className={`conta-page theme-${settings.theme}`}>
      {/* --- Хідер з дропдауном --- */}
      <div
        className="conta-header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 20px",
          position: "relative",
        }}
      >
        <div className="header-left">DearMe</div>
        <div className="header-center">{t.myProfile}</div>
        <div className="header-right">
          <ProfileDropdown /> {/* дропдаун зверху праворуч */}
        </div>
      </div>

      {/* Основний контент */}
      <div className="conta-main">
        <div className="conta-profile-card">
          {/* Аватар */}
          <div className="conta-avatar">
            {profile.avatar ? <img src={profile.avatar} alt="avatar" /> : "Avatar"}
          </div>

          {/* Ім'я та біо */}
          <div className="conta-name">{profile.name} {profile.surname}</div>
          <div className="conta-bio">{profile.bio || t.noBio}</div>

          {/* Інформація */}
          <div className="conta-info-grid">
            <div className="info-box">
              <div className="info-label">{t.gender}</div>
              <div className="info-value">{profile.gender === "male" ? t.male : t.female}</div>
            </div>
            <div className="info-box">
              <div className="info-label">{t.dob}</div>
              <div className="info-value">{profile.dob || "-"}</div>
            </div>
            <div className="info-box">
              <div className="info-label">{t.country}</div>
              <div className="info-value">{profile.selectedCountry?.name || "-"}</div>
            </div>
            <div className="info-box">
              <div className="info-label">{t.city}</div>
              <div className="info-value">{profile.city || "-"}</div>
            </div>
          </div>

          {/* Пости */}
          <div style={{ marginTop: 20, fontWeight: 700, fontSize: 18 }}>{t.lastPosts}</div>
          <div className="posts-grid">
            {posts.length > 0
              ? posts.map((p, i) => (
                  <div className="post-card" key={i}>
                    <h4>{p.title}</h4>
                    <p>{p.content}</p>
                  </div>
                ))
              : Array.from({ length: totalSlots }).map((_, i) => (
                  <div className="post-card placeholder" key={i}></div>
                ))}
          </div>
        </div>
      </div>

      {/* Footer кнопки */}
      <div className="conta-footer-buttons">
        <button className="footer-back" onClick={() => navigate("/feed")}>
          {t.back}
        </button>
        <button className="footer-edit" onClick={() => navigate("/profile")}>
          {t.edit}
        </button>
      </div>
    </div>
  );
}
