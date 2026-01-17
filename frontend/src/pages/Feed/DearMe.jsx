import React, { useState } from "react";
import axios from 'axios';
import "./style.css";

export default DearMe;

function DearMe() {

    const [modalAberto, setModalAberto] = useState(false);
    const abrirModal = () => setModalAberto(true);
    const fecharModal = () => setModalAberto(false);

    function createPost(FormData) {

        const tittle = FormData.get("tittle");
        const content = FormData.get("content");
        const coverB64 = FormData.get("coverB64");

        const postData = ({
            tittle: tittle,
            content: content,
            coverB64: coverB64
        });
        console.log(postData);

        try {
            const response = axios.post("http://localhost:5000/createpost", postData);
            console.log("Publicação criada com sucesso:", response.data);
            alert("Publicação criada com sucesso!");    
        } catch (error) {
            console.error("Erro ao criar publicação:", error.response?.data || error.message);
            alert("Erro ao criar publicação: " + (error.response?.data?.message || "Servidor offline"));
        }

        fecharModal();
    }


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
                <h2>Criar Publicacao</h2>
                    <form className="modal-form" action={createPost} >
                        <input name="tittle" type="text" placeholder="Título" required/>                
                        <textarea name="content" className="content" placeholder="Escreva sua publicação..." required></textarea>
                        <input name="coverB64" className="coverB64" type="file" />
                        <button type="submit">Publicar</button>
                    </form>
                <div className="closeForm">
                    <button onClick={fecharModal}>X</button>
                </div>

            </div>
            </>
            )}

        </div>           
    );
}