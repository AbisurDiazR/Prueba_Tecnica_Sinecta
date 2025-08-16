import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './creates.css';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const CotizacionCreate = () => {
    const { id } = useParams<{ id: string }>();
    const isEditing = !!id;
    const [propietarios, setPropietarios] = useState<any[]>([]);
    const [formData, setFormData] = useState({
        propietario_id: '',
        nombre_cliente: '',
        cultivo: '',
        estado: 'Activa',
        superficie_asegurada: '',
        monto_asegurado: '',
        vigencia_inicio: '',
        vigencia_fin: '',
        latitud: 19.432608,
        longitud: -99.133209,
    });
    const [markerPosition, setMarkerPosition] = useState<[number, number]>([19.432608, -99.133209]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        const fetchPropietarios = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/propietarios`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setPropietarios(response.data);
            } catch (err) {
                console.error('Error fetching propietarios:', err);
            }
        };

        const fetchCotizacion = async () => {
            if (!isEditing) {
                setLoading(false);
                return;
            }
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/cotizaciones/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const cotizacion = response.data;
                
                // Convierte latitud y longitud a números y usa un valor por defecto si son nulos
                const lat = parseFloat(cotizacion.latitud) || 19.432608;
                const lng = parseFloat(cotizacion.longitud) || -99.133209;

                setFormData({
                    propietario_id: cotizacion.propietario_id,
                    nombre_cliente: cotizacion.nombre_cliente,
                    cultivo: cotizacion.cultivo,
                    estado: cotizacion.estado,
                    superficie_asegurada: cotizacion.superficie_asegurada?.toString() ?? '',
                    monto_asegurado: cotizacion.monto_asegurado?.toString() ?? '',
                    vigencia_inicio: cotizacion.vigencia_inicio ? cotizacion.vigencia_inicio.split('T')[0] : '',
                    vigencia_fin: cotizacion.vigencia_fin ? cotizacion.vigencia_fin.split('T')[0] : '',
                    latitud: lat,
                    longitud: lng,
                });
                setMarkerPosition([lat, lng]);
            } catch (err) {
                setError('Error al cargar los datos de la cotización.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchPropietarios();
        fetchCotizacion();
    }, [isEditing, id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    
    const MapEvents = () => {
      useMapEvents({
        click: (e) => {
          const { lat, lng } = e.latlng;
          setMarkerPosition([lat, lng]);
          setFormData((prevData) => ({ ...prevData, latitud: lat, longitud: lng }));
        },
      });
      return null;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('No hay token de autenticación.');
                return;
            }
            
            const dataToSend = {
                ...formData,
                propietario_id: parseInt(formData.propietario_id),
                superficie_asegurada: parseFloat(formData.superficie_asegurada),
                monto_asegurado: parseFloat(formData.monto_asegurado),
            };

            if (isEditing) {
                await axios.put(`${process.env.REACT_APP_API_URL}/cotizaciones/${id}`, dataToSend, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            } else {
                await axios.post(`${process.env.REACT_APP_API_URL}/cotizaciones`, dataToSend, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            }

            navigate('/cotizaciones');
        } catch (err) {
            setError(`Error al ${isEditing ? 'actualizar' : 'crear'} la cotización.`);
            console.error(err);
        }
    };

    if (loading) {
        return <div className="page-container">Cargando datos...</div>;
    }

    return (
        <div className="page-container">
            <h1 className="page-title">{isEditing ? 'Editar Cotización' : 'Crear Nueva Cotización'}</h1>
            <form onSubmit={handleSubmit} className="form-container">
                {error && <p className="error-message">{error}</p>}
                <div className="form-group">
                    <label className="form-label" htmlFor="propietario_id">Propietario</label>
                    <select
                        className="form-input"
                        id="propietario_id"
                        name="propietario_id"
                        value={formData.propietario_id}
                        onChange={handleChange}
                        required
                        disabled={isEditing}
                    >
                        <option value="">Selecciona un propietario</option>
                        {propietarios.map((prop: any) => (
                            <option key={prop.propietario_id} value={prop.propietario_id}>
                                {prop.nombre}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="nombre_cliente">Nombre del Cliente</label>
                    <input className="form-input" id="nombre_cliente" name="nombre_cliente" type="text" value={formData.nombre_cliente} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="cultivo">Cultivo</label>
                    <input className="form-input" id="cultivo" name="cultivo" type="text" value={formData.cultivo} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="superficie_asegurada">Superficie Asegurada</label>
                    <input className="form-input" id="superficie_asegurada" name="superficie_asegurada" type="number" step="0.01" value={formData.superficie_asegurada} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="monto_asegurado">Monto Asegurado</label>
                    <input className="form-input" id="monto_asegurado" name="monto_asegurado" type="number" step="0.01" value={formData.monto_asegurado} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="vigencia_inicio">Vigencia Inicio</label>
                    <input className="form-input" id="vigencia_inicio" name="vigencia_inicio" type="date" value={formData.vigencia_inicio} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="vigencia_fin">Vigencia Fin</label>
                    <input className="form-input" id="vigencia_fin" name="vigencia_fin" type="date" value={formData.vigencia_fin} onChange={handleChange} required />
                </div>
                
                <div className="map-container">
                    <label className="form-label">Ubicación (Haz clic en el mapa)</label>
                    <MapContainer center={markerPosition} zoom={13} style={{ height: '400px', width: '100%' }}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <MapEvents />
                        <Marker position={markerPosition} />
                    </MapContainer>
                    <div className="latlng-display">
                        Latitud: {markerPosition[0].toFixed(6)}, Longitud: {markerPosition[1].toFixed(6)}
                    </div>
                </div>

                <button type="submit" className="submit-button">
                    {isEditing ? 'Guardar Cambios' : 'Crear Cotización'}
                </button>
            </form>
        </div>
    );
};

export default CotizacionCreate;