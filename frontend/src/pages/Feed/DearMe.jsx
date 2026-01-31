import React, { useState, useEffect } from "react";
// import axios from "axios";
import moment from "moment";
import Notificao from "./Notificacoes";
import "moment/dist/locale/pt-br";
import "./style.css";
import "./createPost.css";
import "./Post.css";
import "./notificacao.css";

export default function DearMe() {
    const [msgNotificacao, setMsgNotificacao] = useState("");
    const [modalAberto, setModalAberto] = useState(false);
    const [posts, setPosts] = useState([]);
    const [postSendoEditado, setPostSendoEditado] = useState(null);

    const abrirModal = () => setModalAberto(true);
    
    const fecharModal = () => {
        setModalAberto(false);
        setPostSendoEditado(null);
    };

    // --- BLOCO BACKEND ---
    /*
    async function handleSubmit(event) {
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

        const postData = {
            tittle: formData.get("tittle"),
            content: formData.get("content"),
            coverB64: imageB64 || (postSendoEditado ? postSendoEditado.coverB64 : "")
        };

        try {
            if (postSendoEditado) {
                const response = await axios.put(`http://localhost:5000/editpost/${postSendoEditado.id}`, postData);
                setPosts(prevPosts => prevPosts.map(p => p.id === postSendoEditado.id ? response.data : p));
                alert("Publicação atualizada!");
            } else {
                const response = await axios.post("http://localhost:8080/posts/user/{userID}", postData);
                setPosts(prevPosts => [response.data, ...prevPosts]);
                alert("Publicação criada!");
            }
            fecharModal();
            event.target.reset();
        } catch (error) {
            console.error("Erro na requisição:", error);
            alert("Erro ao salvar publicação.");
        }
    }
    */

    // --- TESTE DE POST (LÓGICA LOCAL ATIVA) ---
    async function handleSubmit(event) {
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

        if (postSendoEditado) {
            setPosts(prevPosts => prevPosts.map(p => 
                p.id === postSendoEditado.id 
                ? { 
                    ...p, 
                    tittle: formData.get("tittle"), 
                    content: formData.get("content"),
                    coverB64: imageB64 || p.coverB64,
                    dataEdicao: Date.now()
                } 
                : p  
            ));
            setMsgNotificacao("Publicação editada com sucesso!");
        } else {
            const novoPost = {
                id: Date.now(),
                tittle: formData.get("tittle"),
                content: formData.get("content"),
                coverB64: imageB64 
            };
            setPosts(prevPosts => [novoPost, ...prevPosts]);
            setMsgNotificacao("Publicação criada com sucesso!");
        }

        fecharModal();
        event.target.reset();
    }

    const deletePost = (postId) => {
        setPosts(posts.filter(post => post.id !== postId));
        setMsgNotificacao("Publicação eliminada com sucesso!");
    };

    const editPost = (postId) => {
        const post = posts.find(p => p.id === postId);
        if (post) {
            setPostSendoEditado(post);
            abrirModal();
        }
    };

    function TempoDinamico({ data }) {
        moment.locale("pt-br");
        const [tempo, setTempo] = useState(moment(data).fromNow());
        
        useEffect(() => {
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
                <header><h1>Dear Me</h1></header>
            </div>
            
            <div className="create-post">
                <button onClick={abrirModal}>Criar Publicação</button>
            </div>

            {modalAberto && (
                <>
                    <div className="overlay" onClick={fecharModal}></div>
                    <div className="formPost">
                        <h2>{postSendoEditado ? "Editar Publicação" : "Criar Publicação"}</h2>
                        <form className="modal-form" onSubmit={handleSubmit}>
                            <input 
                                name="tittle" 
                                type="text" 
                                placeholder="Título" 
                                defaultValue={postSendoEditado ? postSendoEditado.tittle : ""} 
                                required
                            />                
                            <textarea 
                                name="content" 
                                className="content" 
                                placeholder="Escreva sua publicação..." 
                                defaultValue={postSendoEditado ? postSendoEditado.content : ""} 
                                required
                            ></textarea>
                            <input name="coverB64" className="coverB64" type="file" />
                            <button type="submit">
                                {postSendoEditado ? "Salvar Alterações" : "Publicar"}
                            </button>
                        </form>
                        <div className="closeForm">
                            <button onClick={fecharModal}>X</button>
                        </div>
                    </div>
                </>
            )}

            <div className="feed">
                {posts.length === 0 ? (
                    <div className="no-posts-container">
                        <p>Ainda não existem publicações!</p>
                    </div>
                ) : (
                    posts.map((post) => (
                        <div className="postCard" key={post.id}>
                           {/*  <div id="menu-wrap">
                                <input type="checkbox" className="toggler" />
                                <div className="dots"><div></div></div>
                                <div className="menu">
                                    <ul>
                                        <li><button className="link" onClick={() => editPost(post.id)}>Editar</button></li>
                                        <li><button className="link-delete" onClick={() => deletePost(post.id)}>Eliminar</button></li>
                                    </ul>
                                </div>
                            </div> */}



                            <div className="post-content">

                                <div className="post-header">
                                    <h3>{post.tittle}</h3>

                                    <div id="menu-wrap">
                                        <input type="checkbox" className="toggler" />
                                        <div className="dots"><div></div></div>
                                            <div className="menu">
                                                <ul>
                                                    <li><button className="link" onClick={() => editPost(post.id)}>Editar</button></li>
                                                    <li><button className="link-delete" onClick={() => deletePost(post.id)}>Eliminar</button></li>
                                                </ul>
                                            </div>
                                    </div>
                                </div>

                                {post.coverB64 && (
                                    <div className="post-image">
                                        <img src={post.coverB64} alt="Capa" />
                                    </div>
                                )}

                                <p>{post.content}</p>

                                <div className="post-time">
                                    Publicado <TempoDinamico data={post.id} />
                                </div>
                                {post.dataEdicao && (
                                    <div className="post-time edited">
                                        Editado <TempoDinamico data={post.dataEdicao} />
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                )}
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