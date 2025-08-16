import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Pages.css";

const Cotizaciones = () => {
  const [cotizaciones, setCotizaciones] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCotizaciones = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No hay token de autenticación.");
          setLoading(false);
          return;
        }

        const response = await axios.get<any[]>(
          `${process.env.REACT_APP_API_URL}/cotizaciones`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCotizaciones(response.data);
      } catch (err) {
        setError("No se pudieron cargar los datos de cotizaciones.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCotizaciones();
  }, []);

  const handleEdit = (id: number) => {
    navigate(`/cotizaciones/edit/${id}`);
  };

  const filteredCotizaciones = cotizaciones.filter((cotizacion) =>
    cotizacion.nombre_cliente.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="page-container">Cargando cotizaciones...</div>;
  }

  if (error) {
    return <div className="page-container error-message">{error}</div>;
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Cotizaciones</h1>
        <button
          onClick={() => navigate("/cotizaciones/create")}
          className="create-button"
        >
          + Crear Cotización
        </button>
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar por nombre de cliente..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Cultivo</th>
              <th>Superficie</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredCotizaciones.map((cotizacion) => (
              <tr key={cotizacion.cotizacion_id}>
                <td>{cotizacion.cotizacion_id}</td>
                <td>{cotizacion.nombre_cliente}</td>
                <td>{cotizacion.cultivo}</td>
                <td>{cotizacion.superficie_asegurada}</td>
                <td>{cotizacion.estado}</td>
                <td>
                  <button
                    onClick={() => handleEdit(cotizacion.cotizacion_id)}
                    className="action-button edit-button"
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Cotizaciones;
