import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import './DashboardLayout.css';

const DashboardLayout: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="dashboard-title">
          Dashboard
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li>
              <Link to="/propietarios" className="sidebar-link">
                Clientes
              </Link>
            </li>
            <li>
              <Link to="/cotizaciones" className="sidebar-link">
                Cotizaciones
              </Link>
            </li>
          </ul>
        </nav>
        <div className="logout-button-container">
          <button
            onClick={handleLogout}
            className="logout-button"
          >
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Contenido Principal */}
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;