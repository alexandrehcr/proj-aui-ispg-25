import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ProfileDropdown from "./ProfileDropdown"; // дропдаун
import "./ProfileForm.css";

const countries = [
  { name: "Portugal", code: "+351", flag: "https://flagcdn.com/w20/pt.png" },
  { name: "Brasil", code: "+55", flag: "https://flagcdn.com/w20/br.png" },
  { name: "Ucrânia", code: "+380", flag: "https://flagcdn.com/w20/ua.png" },
];

export default function ProfileForm() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const settings = JSON.parse(localStorage.getItem("userSettings")) || { theme: "light", language: "pt" };

  const translations = {
    pt: {
      name: "Nome",
      surname: "Apelido",
      email: "Email",
      dob: "Data de Nascimento",
      gender: "Género",
      male: "Masculino",
      female: "Feminino",
      country: "País",
      city: "Cidade",
      phone: "Telefone",
      bio: "Biografia",
      changePass: "Alterar Palavra-chave",
      currentPass: "Palavra-chave Atual",
      newPass: "Nova Palavra-chave",
      confirmPass: "Confirmar Palavra-chave",
      back: "Voltar",
      reset: "Reset",
      save: "Guardar",
      changePhoto: "Alterar Foto",
    },
    en: {
      name: "Name",
      surname: "Surname",
      email: "Email",
      dob: "Date of Birth",
      gender: "Gender",
      male: "Male",
      female: "Female",
      country: "Country",
      city: "City",
      phone: "Phone",
      bio: "Bio",
      changePass: "Change Password",
      currentPass: "Current Password",
      newPass: "New Password",
      confirmPass: "Confirm Password",
      back: "Back",
      reset: "Reset",
      save: "Save",
      changePhoto: "Change Photo",
    },
    uk: {
      name: "Імʼя",
      surname: "Прізвище",
      email: "Email",
      dob: "Дата народження",
      gender: "Стать",
      male: "Чоловіча",
      female: "Жіноча",
      country: "Країна",
      city: "Місто",
      phone: "Телефон",
      bio: "Біографія",
      changePass: "Змінити пароль",
      currentPass: "Поточний пароль",
      newPass: "Новий пароль",
      confirmPass: "Підтвердити пароль",
      back: "Назад",
      reset: "Скинути",
      save: "Зберегти",
      changePhoto: "Змінити фото",
    },
  };

  const t = translations[settings.language] || translations.pt;

  const [avatar, setAvatar] = useState(null);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [bio, setBio] = useState("");
  const [gender, setGender] = useState("male");
  const [city, setCity] = useState("");
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [selectOpen, setSelectOpen] = useState(false);
  const [phone, setPhone] = useState(countries[0].code + " ");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("profileData"));
    if (data) {
      setAvatar(data.avatar || null);
      setName(data.name || "");
      setSurname(data.surname || "");
      setEmail(data.email || "");
      setDob(data.dob || "");
      setBio(data.bio || "");
      setCity(data.city || "");
      setGender(data.gender || "male");
      setCurrentPass(data.currentPass || "");
      setNewPass(data.newPass || "");
      setConfirmPass(data.confirmPass || "");
      const country = countries.find((c) => c.code === data.selectedCountry?.code) || countries[0];
      setSelectedCountry(country);
      setPhone(country.code + " ");
    }
  }, []);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setAvatar(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (newPass && newPass !== confirmPass) {
      alert("Passwords do not match");
      return;
    }
    localStorage.setItem(
      "profileData",
      JSON.stringify({
        avatar,
        name,
        surname,
        email,
        dob,
        bio,
        city,
        gender,
        currentPass,
        newPass,
        confirmPass,
        selectedCountry,
      })
    );
    alert("Saved");
  };

  const handleReset = () => {
    localStorage.removeItem("profileData");
    setAvatar(null);
    setName("");
    setSurname("");
    setEmail("");
    setDob("");
    setBio("");
    setCity("");
    setGender("male");
    setCurrentPass("");
    setNewPass("");
    setConfirmPass("");
    setSelectedCountry(countries[0]);
    setPhone(countries[0].code + " ");
  };

  return (
    <div className={`profile-fullscreen theme-${settings.theme}`}>
      {/* Header з дропдауном */}
      <div
        className="header"
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 20px",
        }}
      >
        <span>DearMe</span>
        <ProfileDropdown /> {/* дропдаун зверху праворуч */}
      </div>

      <div className="main">
        <div className="sidebar">
          <div className="avatar-circle">{avatar ? <img src={avatar} alt="" /> : "Avatar"}</div>
          <button onClick={() => fileInputRef.current.click()}>{t.changePhoto}</button>
          <input ref={fileInputRef} type="file" hidden accept="image/*" onChange={handleAvatarChange} />
          <div>{name} {surname}</div>
        </div>

        <div className="content">
          <form>
            {/* Name, Surname, Email */}
            <div className="form-field">
              <label>{t.name}</label>
              <input value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="form-field">
              <label>{t.surname}</label>
              <input value={surname} onChange={(e) => setSurname(e.target.value)} />
            </div>
            <div className="form-field">
              <label>{t.email}</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            {/* Gender */}
            <div className="form-field">
              <label>{t.gender}</label>
              <select value={gender} onChange={(e) => setGender(e.target.value)}>
                <option value="male">{t.male}</option>
                <option value="female">{t.female}</option>
              </select>
            </div>

            {/* Country */}
            <div className="form-field">
              <label>{t.country}</label>
              <div className="custom-select">
                <div className="select-selected" onClick={() => setSelectOpen(!selectOpen)}>
                  <img src={selectedCountry.flag} alt="" /> {selectedCountry.name}
                </div>
                {selectOpen && (
                  <div className="select-items">
                    {countries.map((c) => (
                      <div
                        key={c.code}
                        onClick={() => {
                          setSelectedCountry(c);
                          setPhone(c.code + " ");
                          setSelectOpen(false);
                        }}
                      >
                        <img src={c.flag} alt="" /> {c.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* City, Phone */}
            <div className="form-field">
              <label>{t.city}</label>
              <input value={city} onChange={(e) => setCity(e.target.value)} />
            </div>
            <div className="form-field">
              <label>{t.phone}</label>
              <input value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>

            {/* DOB */}
            <div className="form-field">
              <label>{t.dob}</label>
              <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
            </div>

            {/* Bio */}
            <div className="form-field full-width">
              <label>{t.bio}</label>
              <textarea value={bio} onChange={(e) => setBio(e.target.value)} />
            </div>

            {/* Password */}
            <div className="form-field full-width section-title">{t.changePass}</div>
            <div className="password-group">
              <div className="form-field">
                <label>{t.currentPass}</label>
                <input type="password" value={currentPass} onChange={(e) => setCurrentPass(e.target.value)} />
              </div>
              <div className="form-field">
                <label>{t.newPass}</label>
                <input type="password" value={newPass} onChange={(e) => setNewPass(e.target.value)} />
              </div>
              <div className="form-field">
                <label>{t.confirmPass}</label>
                <input type="password" value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} />
              </div>
            </div>
          </form>

          <div className="footer-buttons">
            <button className="btn btn-back" onClick={() => navigate("/feed")}>{t.back}</button>
            <button className="btn btn-reset" onClick={handleReset}>{t.reset}</button>
            <button className="btn btn-save" onClick={handleSave}>{t.save}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
