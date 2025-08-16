import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./components/DashboardLayout";
import Propietarios from "./pages/Propietarios";
import Cotizaciones from "./pages/Cotizaciones";
import PropietarioCreate from "./pages/PropietarioCreate";
import CotizacionCreate from "./pages/CotizacionCreate";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rutas Protegidas */}
        <Route path="/" element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route index element={<Propietarios />} />
            <Route path="propietarios" element={<Propietarios />} />
            <Route path="propietarios/create" element={<PropietarioCreate />} />
            <Route
              path="propietarios/edit/:id"
              element={<PropietarioCreate />}
            />
            <Route path="cotizaciones" element={<Cotizaciones />} />
            <Route path="cotizaciones/create" element={<CotizacionCreate />} />
            <Route
              path="cotizaciones/edit/:id"
              element={<CotizacionCreate />}
            />
          </Route>
        </Route>

        {/* Ruta por defecto que redirige al login */}
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
