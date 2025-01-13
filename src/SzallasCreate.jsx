import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as THREE from 'three';
import NET from "vanta/dist/vanta.net.min";
import './SzallasList.css';

export const SzallasCreate = () => {
    const [name, setName] = useState('');
    const [hostname, setHostname] = useState('');
    const [location, setLocation] = useState('');
    const [price, setPrice] = useState(0);
    const [minimum_nights, setMinimumNights] = useState(0);
    const [error, setError] = useState('');
    const vantaRef = useRef(null);
    const navigate = useNavigate();

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

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const token = localStorage.getItem('jwt');
            if(!token) {
                throw new Error('Nem található JWT token!');
            }
            const valasz = await axios.post('https://szallasjwt.sulla.hu/data', {
                name,
                hostname,
                location,
                price,
                minimum_nights
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            navigate('/SzallasList');
        }
        catch(error) {
            setError('Az adatok mentése sikertelen. Lehet, hogy nem vagy bejelentkezve?');
            console.error("Hiba az adatok mentése során: ", error);
        }
    }

    return (
        <div id="vanta-container" ref={vantaRef} style={{ minHeight: "100vh" }}>
            <div id="content">
                <h2>Új szállás felvétele</h2>
                {error && <p style={{ color: 'red'}}> {error} </p>}
                <form onSubmit={handleSubmit} className="form">
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Név</label>
                        <input type="text" className="form-control" id="name" value={name} onChange={(event) => setName(event.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="hostname" className="form-label">Hostname</label>
                        <input type="text" className="form-control" id="hostname" value={hostname} onChange={(event) => setHostname(event.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="location" className="form-label">Helyszín</label>
                        <input type="text" className="form-control" id="location" value={location} onChange={(event) => setLocation(event.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="price" className="form-label">Ár</label>
                        <input type="number" className="form-control" id="price" value={price} onChange={(event) => setPrice(event.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="minimum_nights" className="form-label">Minimum éjszakák</label>
                        <input type="number" className="form-control" id="minimum_nights" value={minimum_nights} onChange={(event) => setMinimumNights(event.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-primary">Mentés</button>
                    <Link className="btn btn-secondary" to="/szallasok">Vissza a szállások listájához</Link>
                </form>
            </div>
        </div>
    )
}


