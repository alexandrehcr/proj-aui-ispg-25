import React, { useEffect } from "react";
import "./notificacao.css";

const Notificao = ({ message, onClose}) => {
    useEffect(() => {
        const timer = setTimeout(() => {
        onClose();
    }, 3000);

        return () => clearTimeout(timer);
    }, [onClose]);

return (
    <div className="notification-toast">
        <p>{message}</p>
        <button onClick={onClose}>&times;</button>
        </div>
    );
}

export default Notificao;