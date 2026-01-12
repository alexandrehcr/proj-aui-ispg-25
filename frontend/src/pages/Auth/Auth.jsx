import React from "react";
import "./style.css";
export default Auth;

function Auth() {
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
            <h2 className="form-title">Registar</h2>
            <form className="auth-form">
                <div className="form-group">
                    <label htmlFor="text">Nome</label>
                    <input type="text" id="text" required />
                </div>

                <div className="form-group">
                    <label htmlFor="reg-mail">Email</label>
                    <input type="email" id="reg-mail" required />
                </div>

                <div className="form-group">
                    <label htmlFor="reg-pass">Password</label>
                    <input type="password" id="reg-pass" required />
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