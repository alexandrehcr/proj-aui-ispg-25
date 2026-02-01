import React, { useState } from "react";
import axios from 'axios';
import Notificao from "../Feed/Notificacoes";
import "./style.css";
import { useNavigate } from "react-router-dom"; 

function Auth() {
    const [msgNotificacao, setMsgNotificacao] = useState("");
    const [user, setUser] = useState("");
    const [regmail, setRegmail] = useState("");
    const [regPass, setRegPass] = useState("");
    const [identifier, setIdentifier] = useState("");
    const [userID, setUserID] = useState(null);
    const [pass, setPass] = useState("");
    const navigate = useNavigate();

    const submitreg = async (e) => {
        e.preventDefault();

        const userdata = {
            username: user,
            email: regmail,
            password: regPass
        };
        console.log("A enviar para backend ", userdata)
        try {
            const response = await axios.post("http://localhost:8080/users", userdata);
            console.log("Sucesso:", response.data);
            setMsgNotificacao("Registo efetuado com sucesso!");
            setUser("");
            setRegmail("");
            setRegPass("");
        } catch (error) {
            console.error("Erro no registo:", error.response?.data || error.message);
            setMsgNotificacao("Erro ao registar: " + (error.response?.data?.message || "Servidor offline"));
        }
    };

    // const submitlogin = async (e) => {
    // e.preventDefault();
    //         try {
    //             const response = await axios.post("http://localhost:8080/users", {
    //                 username: identifier,
    //                 password: pass
    //             });

    //             if (response.status === 200) {
    //                 setUserID(response.data.id); 
    //                 setMsgNotificacao("Login bem sucedido!");  
    //                 setTimeout(() => {
    //                     navigate('/Feed');
    //                 }, 1000);
    //             }
    //         } catch (err) {
    //             console.error(err);
    //             setMsgNotificacao("Erro no Login: Credenciais inválidas ou erro de rede");
    //         }
    //     };


        const submitlogin = async (e) => {
            e.preventDefault();

            const contaTeste = {
                username: "admin",
                password: "123"
            };

                
                if (identifier === contaTeste.username && pass === contaTeste.password) {
                    // Salva o username no localStorage
                    localStorage.setItem("username", contaTeste.username);
                setTimeout(() => {
                        navigate('/Feed');
                    }, 1000);
                } else {
                    setMsgNotificacao("Erro: Utilizador ou senha de teste incorretos");
            }
                };

    return (
        <div className="auth-container">
            <input type="checkbox" id="auth-toggle" className="auth-toggle" />
            
            <div className="auth-card login-card">
                <h2 className="form-title">Login</h2>
                <form className="auth-form" onSubmit={submitlogin}>
                    <div className="form-group">
                        <label htmlFor="loginField">Email ou nome do utilizador</label>
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
                        <input 
                            type="password" 
                            id="pass" 
                            required 
                            value={pass}
                            onChange={(e) => setPass(e.target.value)} 
                        />
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
                        <label htmlFor="user">Nome de utilizador</label>
                        <input 
                            type="text" 
                            id="user" 
                            maxLength="24" 
                            minLength="2" 
                            placeholder="Nome (entre 2 e 24 caracteres)" 
                            value={user}
                            onChange={(e) => setUser(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="reg-mail">Email</label>
                        <input 
                            type="email" 
                            id="reg-mail" 
                            value={regmail}
                            onChange={(e) => setRegmail(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="reg-pass">Senha</label>
                        <input 
                            type="password" 
                            id="reg-pass" 
                            maxLength="64" 
                            minLength="8" 
                            placeholder="Mínimo 8 caracteres" 
                            value={regPass}
                            onChange={(e) => setRegPass(e.target.value)} 
                            required 
                        />
                    </div>
                    <button type="submit" className="btn-primary">Criar Conta</button>
                </form>
                <p className="auth-footer">
                    Já tens conta? 
                    <label htmlFor="auth-toggle" className="link-btn">Voltar ao Login</label>
                </p>
            </div>

            {msgNotificacao && (
                <Notificao 
                    message={msgNotificacao} 
                    onClose={() => setMsgNotificacao("")} 
                />
            )}
        </div>        
    );
}

export default Auth;