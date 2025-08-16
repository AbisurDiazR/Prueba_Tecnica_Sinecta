import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './creates.css';

const PropietarioCreate = () => {
    const { id } = useParams<{ id: string }>();
    const isEditing = !!id; // True si hay un ID en la URL
    const [nombre, setNombre] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (isEditing) {
            const fetchPropietario = async () => {
                try {
                    const token = localStorage.getItem('token');
                    const response = await axios.get(`${process.env.REACT_APP_API_URL}/propietarios/${id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    const propietario = response.data;
                    setNombre(propietario.nombre);
                    setEmail(propietario.email);
                } catch (err) {
                    setError('Error al cargar los datos del propietario.');
                    console.error(err);
                }
            };
            fetchPropietario();
        }
    }, [isEditing, id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('No hay token de autenticación.');
                return;
            }

            const data = { nombre, email };

            if (isEditing) {
                await axios.put(`${process.env.REACT_APP_API_URL}/propietarios/${id}`, data, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            } else {
                await axios.post(`${process.env.REACT_APP_API_URL}/propietarios`, data, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            }

            navigate('/propietarios');
        } catch (err) {
            setError(`Error al ${isEditing ? 'actualizar' : 'crear'} el propietario.`);
            console.error(err);
        }
    };

    return (
        <div className="page-container">
            <h1 className="page-title">{isEditing ? 'Editar Propietario' : 'Crear Nuevo Propietario'}</h1>
            <form onSubmit={handleSubmit} className="form-container">
                {error && <p className="error-message">{error}</p>}
                <div className="form-group">
                    <label className="form-label" htmlFor="nombre">Nombre</label>
                    <input
                        className="form-input"
                        id="nombre"
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="email">Email</label>
                    <input
                        className="form-input"
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="submit-button">
                    {isEditing ? 'Guardar Cambios' : 'Crear Propietario'}
                </button>
            </form>
        </div>
    );
};

export default PropietarioCreate;