import React, { useState } from "react";
import axios from 'axios';
import "./style.css";

function Auth() {

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

    return (
        <div className="auth-container">
        <input type="checkbox" id="auth-toggle" className="auth-toggle" />
        <div className="auth-card login-card">
            <h2 className="form-title">Login</h2>
            <form className="auth-form">
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" required />
            </div>

            <div className="form-group">
                <label htmlFor="pass">Password</label>
                <input type="password" id="pass" required />
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
                    <input name="email" type="email" id="reg-mail" onChange={(e) => setRegmail(e.target.value)} required />
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
