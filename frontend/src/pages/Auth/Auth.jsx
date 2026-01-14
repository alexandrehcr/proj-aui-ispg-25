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
    const [identifier, setIdentifier] = useState("");
    const [pass, setPass] = useState("");
    const navigate = useNavigate();

    const submitlogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/login", {
                username: identifier,
                password: pass
            });
            
            if (response.status === 200) {
                console.log("Login bem sucedido:", response.data);
                navigate("/Feed"); 
            } else {
                console.error("Credenciais inválidas");
                alert("Credenciais inválidas");
            }

        } catch (err) {
            console.error(err);
            alert("Erro no login");
        }
    };
    
    return (
        <div className="auth-container">
        <input type="checkbox" id="auth-toggle" className="auth-toggle" />
        <div className="auth-card login-card">
            <h2 className="form-title">Login</h2>
            {/* // login */}
            <form className="auth-form" onSubmit={submitlogin}>
            <div className="form-group">
                <label htmlFor="loginField">Email ou nome do utilizador </label>
                <input 
                    type="text" 
                    id="loginField" 
                    required 
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)} 
                />
            </div>
            <div className="form-group">
                <label htmlFor="pass">Senha</label>
                <input type="password" id="pass" required onChange={(e) => setPass(e.target.value)} />
            </div>
            <button type="submit" className="btn-primary">Entrar</button>
            </form>

            <p className="auth-footer">
            Ainda não tens conta? 
            <label htmlFor="auth-toggle" className="link-btn">Criar Conta</label>
            </p>
        </div>
        {/* // register */}
        <div className="auth-card register-card">
            <h2 className="form-title">Criar Conta</h2>
            
            <form className="auth-form" onSubmit={submitreg}>
                <div className="form-group">
                    <label htmlFor="user">Nome de utilizador</label>
                    <input name="username" type="text" id="text" maxlength="24" minlength="2" placeholder="Nome (entre 2 e 24 caracteres)" onChange={(e) => setUser(e.target.value)} required />
                    
                </div>
                    <div className="form-group">
                        <label htmlFor="regmail">Email</label>
                        <input name="email" type="email"  id="reg-mail" onChange={(e) => setRegmail(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="regpass">Senha</label>
                    <input name="password" type="password" id="reg-pass" maxlength="64" minlength="8" placeholder="Password (entre 8 e 64 caracteres)" onChange={(e) => setRegPass(e.target.value)} required />
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