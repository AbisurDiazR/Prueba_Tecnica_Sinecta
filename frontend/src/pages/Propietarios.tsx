import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Pages.css";

const Propietarios = () => {
  const [propietarios, setPropietarios] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPropietarios = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No hay token de autenticación.");
          setLoading(false);
          return;
        }

        const response = await axios.get<any[]>(
          `${process.env.REACT_APP_API_URL}/propietarios`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPropietarios(response.data);
      } catch (err) {
        setError("No se pudieron cargar los datos de propietarios.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPropietarios();
  }, []);

  const handleEdit = (id: number) => {
    navigate(`/propietarios/edit/${id}`);
  };

  const filteredPropietarios = propietarios.filter(
    (propietario) =>
      propietario.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      propietario.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="page-container">Cargando clientes...</div>;
  }

  if (error) {
    return <div className="page-container error-message">{error}</div>;
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Clientes</h1>
        <button
          onClick={() => navigate("/propietarios/create")}
          className="create-button"
        >
          + Crear Propietario
        </button>
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar por nombre o email..."
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
              <th>Nombre</th>
              <th>Email</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredPropietarios.map((propietario) => (
              <tr key={propietario.propietario_id}>
                <td>{propietario.propietario_id}</td>
                <td>{propietario.nombre}</td>
                <td>{propietario.email}</td>
                <td>
                  <button
                    onClick={() => handleEdit(propietario.propietario_id)}
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

export default Propietarios;
