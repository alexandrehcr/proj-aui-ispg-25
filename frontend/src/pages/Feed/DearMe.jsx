import React, { useState } from "react";
import "./style.css";

export default DearMe;

function DearMe() {

    const [modalAberto, setModalAberto] = useState(false);

    const abrirModal = () => setModalAberto(true);
    const fecharModal = () => setModalAberto(false);


    return (
        <div className="DearME">
            <div className="dear-header">
                <header>
                    <h1>Dear Me</h1>
                </header>
            </div>
            <div className="create-post">
                <button onClick={abrirModal}>Criar Publicação</button>
            </div>

            {modalAberto && (
            <>
            <div className="overlay" onClick={fecharModal}></div>
            <div className="formPost">
                
                <h2>Formulário de Publicação</h2>
                    <form className="modal-form">
                        <input type="text" placeholder="Título" />
                        <textarea placeholder="Escreva sua publicação..."></textarea>
                        <input type="file" />
                        <button type="submit">Publicar</button>
                    </form>
                <button onClick={fecharModal}>X</button>
            </div>
            </>
            )}

        </div>           
    );
}