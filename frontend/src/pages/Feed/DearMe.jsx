import React, { useState, useEffect } from "react";
// import axios from 'axios';
import moment from "moment";
import "moment/dist/locale/pt-br";
import "./style.css";
import "./createPost.css";
import "./Post.css";

export default function DearMe() {

    const [modalAberto, setModalAberto] = useState(false);
    const [posts, setPosts] = useState([]);

    const abrirModal = () => setModalAberto(true);
    const fecharModal = () => setModalAberto(false);

    // Código comentado para integração futura com backend
    // async function createPost(event) {
    //     event.preventDefault();
        
    //     const formData = new FormData(event.target);
    //     const postData = {
    //         tittle: formData.get("tittle"),
    //         content: formData.get("content"),
    //         coverB64: formData.get("coverB64")
    //     };
    //     try {
    //         const response = await axios.post("http://localhost:5000/createpost", postData);
            
    //         const novoPostCriado = response.data; 
    //         setPosts([novoPostCriado, ...posts]); 

    //         alert("Publicação criada com sucesso!");
    //         fecharModal();
    //     } catch (error) {
    //         console.error("Erro ao criar publicação:", error);
    //         alert("Erro ao criar publicação.");
    //     }
    // }

    // Simulação de criação de post sem backend
    async function createPost(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const imageFile = formData.get("coverB64");

        const convertToBase64 = (file) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = (error) => reject(error);
            });
        };

        let imageB64 = "";

        if (imageFile && imageFile.size > 0) {
            try {
                imageB64 = await convertToBase64(imageFile);
            } catch (error) {
                console.error("Erro ao converter imagem:", error);
            }
        }

        const novoPostSimulado = {
            id: Date.now(),
            tittle: formData.get("tittle"),
            content: formData.get("content"),
            coverB64: imageB64 
        };

        console.log("Novo post simulado:", novoPostSimulado);

        setPosts(prevPosts => [novoPostSimulado, ...prevPosts]); 
        fecharModal();
        event.target.reset();
    }

    function TempoDinamico({ data }) {
        
        moment.locale("pt-br");
        const [tempo, setTempo] = useState(moment(data).fromNow());
        
        useEffect(() => {
            moment.locale("pt-br");
            const intervalo = setInterval(() => {
                setTempo(moment(data).fromNow());
            }, 30000); 

            return () => clearInterval(intervalo);
        }, [data]);

        return <span>{tempo}</span>; 
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
                        <form className="modal-form" onSubmit={createPost}>
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

            <div className="feed">
            {posts.map((post) => (
                <div className="postCard" key={post.id}>
                {post.coverB64 && (
                    <div className="post-image">
                    <img src={post.coverB64} alt="Capa do post" />
                    </div>
                )}

                <div className="post-content">
                    <h3>{post.tittle}</h3>
                    <p>{post.content}</p>
                    <span className="post-time">
                        Publicado{" "} <TempoDinamico data={post.id} />
                    </span>
                </div>
                </div>
            ))}
            </div>
        </div>          
    );
}