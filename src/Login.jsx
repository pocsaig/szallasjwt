import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';


export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post("https://szallasjwt.sulla.hu/login", { username, password });
            const token = response.data.token;
            localStorage.setItem("token", token);
            setError('');
            navigate("/szallaslist");
        }
        catch (error) {
            setError("Hitelesítés sikertelen. Ellenőrízd a bejelentkezés adatokat!");
            console.error("Hiba a bejelentkezés során: ", error);
        }
    }

    return (
        <div className="container mt-5 login">
            <h2>Bejelentkezés</h2>
            {error && <p className="error-message">{error}</p>}
            <input
                type="text"
                placeholder="Felhasználónév"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            /><br />
            <input
                type="password"
                placeholder="Jelszó"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            /><br />
            <button onClick={handleLogin}>Bejelentkezés</button>
        </div>
    );
}
