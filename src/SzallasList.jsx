import React, { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

export const SzallasList = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    throw new Error("Nem található JWT token.");
                }
                const response = await axios.get("https://szallasjwt.sulla.hu/data", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setData(response.data);
            } catch (error) {
                setError('Adatok lekérése sikertelen. Lehet, hogy nem vagy bejelentkezve.');
                console.error("Hiba az adatok lekérése során.", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Szállások listája</h2>
            {error && <p className="text-danger">{error}</p>}
            <div className="row">
                {data.length > 0 ? (
                    data.map((item) => (
                        <div className="col-md-4 mb-4" key={item.id}>
                            <div className="card h-100 shadow-sm">
                                <div className="card-body">
                                    <h5 className="card-title">{item.name}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">{item.hostname}</h6>
                                    <p className="card-text">
                                        <strong>Helyszín:</strong> {item.location}<br />
                                        <strong>Ár:</strong> {item.price} Ft/éj<br />
                                        <strong>Minimum éjszakák:</strong> {item.minimum_nights}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Nincsenek adatok!</p>
                )}
            </div>
        </div>
    );
};
