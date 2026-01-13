import React, { useState } from "react";
import axios from 'axios';
import "./style.css";
import { useNavigate } from "react-router-dom"; 
function Auth() {
    // register
    const [user, setUser] = useState("");
    const [regmail, setRegmail] = useState("");
    const [regPass, setRegPass] = useState("");

    const submitreg = async (e) => {
        e.preventDefault();

        const userdata = {
            user: user,
            email: regmail,
            password: regPass
        };
        
        console.log(userdata);
        
        try {
            const response = await axios.post("http://localhost:5000/register", userdata);
            
            console.log("Sucesso:", response.data);
            alert("Registo efetuado com sucesso!");

            setUser("");
            setRegmail("");
            setRegPass("");

        } catch (error) {
            console.error("Erro no registo:", error.response?.data || error.message);
            alert("Erro ao registar: " + (error.response?.data?.message || "Servidor offline"));
        }
    };
    // login
    const [userName, setUsername] = useState("");
    const [login, setLogin] = useState("");
    const [pass, setPass] = useState("");
    const navigate = useNavigate();

    const submitlogin = async (e) => {
        e.preventDefault();

        const userdata = {
            user: userName,
            email: login,
            password: pass
        };
        
        console.log(userdata);
        
        try {
            const response = await axios.get("http://localhost:5000/login", userdata);
            
            console.log("Sucesso:", response.data);
            alert("Login efetuado com sucesso!");

            navigate("/feed");
            console.log("erro ao entrar no dearme")

            setUsername("");
            setLogin("");
            setPass("");

        } catch (error) {
            console.error("Erro no login:", error.response?.data || error.message);
            alert("Erro ao fazer login: " + (error.response?.data?.message || "Servidor offline"));
        }
    };

    

    return (
        <div className="auth-container">
        <input type="checkbox" id="auth-toggle" className="auth-toggle" />
        <div className="auth-card login-card">
            <h2 className="form-title">Login</h2>
            
            <form className="auth-form" onSubmit={submitlogin}>
            <div className="form-group">
                <label htmlFor="text">Email ou Username</label>
                <input type="text" id="text" required onChange={(e) => setUsername(e.target.value) || setPass(e.target.value)} />
            </div>
            <div className="form-group">
                <label htmlFor="pass">Password</label>
                <input type="password" id="pass" required onChange={(e) => setPass(e.target.value)} />
            </div>
            <button type="submit" className="btn-primary">Entrar</button>
            </form>

            <p className="auth-footer">
            Ainda não tens conta? 
            <label htmlFor="auth-toggle" className="link-btn">Criar Conta</label>
            </p>
        </div>

        <div className="auth-card register-card">
            <h2 className="form-title">Criar Conta</h2>
            <form className="auth-form" onSubmit={submitreg}>
                <div className="form-group">
                    <label htmlFor="user">Nome</label>
                    <input name="username" type="text" id="text" onChange={(e) => setUser(e.target.value)} required />
                    
                </div>

                <div className="form-group">
                    <label htmlFor="regmail">Email</label>
                    <input name="email" type="email"  id="reg-mail" onChange={(e) => setRegmail(e.target.value)} required />
                </div>

                <div className="form-group">
                    <label htmlFor="regpass">Password</label>
                    <input name="password" type="password" id="reg-pass" onChange={(e) => setRegPass(e.target.value)} required />
                </div>

                <button type="submit" className="btn-primary">Criar Conta</button>
            </form>
            <p className="auth-footer">
            Já tens conta? <label htmlFor="auth-toggle" className="link-btn">Voltar ao Login</label>
            </p>
        </div>
        </div>
    );
}

export default Auth;
