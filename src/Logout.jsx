import React from "react";
import { useNavigate } from "react-router-dom";

export const Logout = () => {
    const navigate=useNavigate();
    const handleLogout= () => {
        localStorage.removeItem("token");
        navigate("/");
    }
    return(
        <div className="container mt-5 login" >
            <h2>Kijelentkezés</h2>
            <button onClick={handleLogout}>Kijelentkezés</button>
        </div>
    )
}