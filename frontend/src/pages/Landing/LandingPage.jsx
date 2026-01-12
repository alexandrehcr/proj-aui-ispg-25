import React from "react";
import './style.css';
import imagemBoneco from './image/unnamed.png';
import { Link } from 'react-router-dom';

export default LandingPage;

function LandingPage() {
    return (
        <div className="landing-Page">
            
            <div className="landing-header">
                <header>
                    <h1>Dear Me</h1>
                        <div className="Auth">
                            <Link to="/auth" className="login-button">Entrar / Cadastrar</Link>
                        </div>
                </header> 
            </div>

            <div className="container">
                <div className="conth2">
                    <h2>Bem Vindo ao Dear Me</h2>
                    <p>Seu espaço pessoal para refletir, crescer e se conectar com seu eu interior. Comece sua jornada hoje!</p>
                </div>
                
                <div className="contImage">
                    <img src={imagemBoneco} alt="Boneco" />
                </div>
            </div>

        </div>
    );
}