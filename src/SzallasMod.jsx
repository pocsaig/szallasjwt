import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import * as THREE from 'three';
import NET from "vanta/dist/vanta.net.min";
import './SzallasList.css';

export const SzallasModPage = () => {
    const params = useParams();
    const id = params.id;
    const navigate = useNavigate();
    const [szallas, setSzallas] = useState({
        name: '',
        hostname: '',
        location: '',
        price: 0,
        minimum_nights: 0
    });
    const vantaRef = useRef(null);

    useEffect(() => {
        const vantaEffect = NET({
            el: vantaRef.current,
            THREE,
            color: 0xff0000,
            backgroundColor: 0xffffff,
            points: 12.0,
            maxDistance: 20.0,
            spacing: 18.0,
        });

        return () => {
            if (vantaEffect) vantaEffect.destroy();
        };
    }, []);

    useEffect(() => {
        const fetchSzallasData = async () => {
            try {
                const response = await axios.get(`https://szallasjwt.sulla.hu/data/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('jwt')}`
                    }
                });
                setSzallas(response.data);
            } catch (error) {
                console.log('Error fetching szallas data:', error);
            }
        };

        fetchSzallasData();
    }, [id]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setSzallas(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = event => {
        event.preventDefault();
        axios.put(`https://szallasjwt.sulla.hu/data/${id}`, szallas, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`
            }
        })
        .then(() => {
            navigate("/SzallasList");
        })
        .catch(error => {
            console.log('Error updating szallas data:', error);
        });
    };

    return (
        <div ref={vantaRef} className="p-5 content bg-whitesmoke text-center">
            <h2>Szállás módosítása</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label">Név:</label>
                    <div className="col-sm-9">
                        <input type="text" name="name" className="form-control" value={szallas.name} onChange={handleInputChange}/>
                    </div>
                </div>
                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label">Hostname:</label>
                    <div className="col-sm-9">
                        <input type="text" name="hostname" className="form-control" value={szallas.hostname} onChange={handleInputChange}/>
                    </div>
                </div>
                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label">Location:</label>
                    <div className="col-sm-9">
                        <input type="text" name="location" className="form-control" value={szallas.location} onChange={handleInputChange}/>
                    </div>
                </div>
                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label">Ár:</label>
                    <div className="col-sm-9">
                        <input type="number" name="price" className="form-control" value={szallas.price} onChange={handleInputChange}/>
                    </div>
                </div>
                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label">Minimális éjszakák száma:</label>
                    <div className="col-sm-9">
                        <input type="number" name="minimum_nights" className="form-control" value={szallas.minimum_nights} onChange={handleInputChange}/>
                    </div>
                </div>
                <button type="submit" className="btn btn-success">Küldés</button>
                <Link to="/SzallasList" className="btn btn-secondary ml-2">Vissza</Link>
            </form>
        </div>
    );
};


