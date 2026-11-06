
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import Sidebar from "../Components/Sidebar";
import IAButton from "../Components/IAButton";

export default function DashboardLayout() {
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();

  const cambiarTema = () => {
    document.body.classList.toggle("dark");
  };

  return (
    <>
      <div className={`dashboard-layout ${menu ? "menu-abierto" : ""}`}>
        <Sidebar
          abierto={menu}
          cerrar={() => setMenu(false)}
        />

        <header className="dashboard-header">
          <div className="header-left">
            <button
              className="hamburger"
              type="button"
              onClick={() => setMenu((anterior) => !anterior)}
              aria-label={menu ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={menu}
            >
              ☰
            </button>

            <div className="brand-dashboard">
              <img
                src="/img/logo.png"
                alt="Logo SENA"
                className="logo-sena"
              />

              <div className="brand-text">
                <strong>Centro de Simulación</strong>
                <span>SENA</span>
              </div>
            </div>
          </div>

          <div className="header-actions">
            <button
              className="header-button"
              type="button"
              title="Notificaciones"
              aria-label="Notificaciones"
              onClick={() => navigate("/notificaciones")}
            >
              🔔
            </button>

            <button
              className="header-button"
              type="button"
              title="Cambiar tema"
              aria-label="Cambiar tema"
              onClick={cambiarTema}
            >
              🌙
            </button>
          </div>
        </header>

        <main className="dashboard-main">
          <Outlet />
        </main>

        <IAButton />
      </div>

      <style>{`
        * {
          box-sizing: border-box;
        }

        .dashboard-layout {
          min-height: 100vh;
          background: #f5f7f6;
        }

        .dashboard-header {
          height: 80px;
          background: #ffffff;
          border-bottom: 1px solid #e1e7e4;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 28px;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 2000;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 18px;
          min-width: 0;
        }

        .hamburger {
          width: 46px;
          height: 46px;
          flex-shrink: 0;
          border: none;
          border-radius: 12px;
          background: #eaf6ef;
          color: #006b3c;
          font-size: 26px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s, transform 0.2s;
        }

        .hamburger:hover {
          background: #d5eee0;
          transform: scale(1.03);
        }

        .brand-dashboard {
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 0;
        }

        .logo-sena {
          width: 52px;
          height: 52px;
          object-fit: contain;
          flex-shrink: 0;
        }

        .brand-text {
          display: flex;
          flex-direction: column;
          line-height: 1.2;
        }

        .brand-text strong {
          color: #006b3c;
          font-size: 19px;
          font-weight: 700;
        }

        .brand-text span {
          color: #6c7a74;
          font-size: 13px;
          margin-top: 3px;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .header-button {
          width: 44px;
          height: 44px;
          flex-shrink: 0;
          border: none;
          border-radius: 50%;
          background: #eaf6ef;
          color: #14532d;
          cursor: pointer;
          font-size: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s, transform 0.2s;
        }

        .header-button:hover {
          background: #d5eee0;
          transform: translateY(-1px);
        }

        .dashboard-main {
          min-height: 100vh;
          padding: 104px 24px 28px;
          background: #f5f7f6;
          transition: background 0.2s;
        }

        .dashboard-layout.menu-abierto::after {
          content: "";
          position: fixed;
          top: 80px;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.32);
          z-index: 1400;
          pointer-events: none;
        }

        body.dark,
        body.dark #root {
          background: #101916;
          color: #e5eee9;
        }

        body.dark .dashboard-layout,
        body.dark .dashboard-main {
          background: #101916;
          color: #e5eee9;
        }

        body.dark .dashboard-header {
          background: #17231f;
          border-color: #293a34;
        }

        body.dark .brand-text strong {
          color: #52c785;
        }

        body.dark .brand-text span {
          color: #aebcb6;
        }

        body.dark .hamburger,
        body.dark .header-button {
          background: #22352e;
          color: #7de0a8;
        }

        @media (max-width: 700px) {
          .dashboard-header {
            height: 70px;
            padding: 0 12px;
          }

          .header-left {
            gap: 10px;
          }

          .dashboard-main {
            padding: 88px 14px 22px;
          }

          .hamburger {
            width: 40px;
            height: 40px;
            font-size: 23px;
          }

          .logo-sena {
            width: 38px;
            height: 38px;
          }

          .brand-dashboard {
            gap: 8px;
          }

          .brand-text strong {
            font-size: 14px;
          }

          .brand-text span {
            font-size: 11px;
          }

          .header-actions {
            gap: 5px;
          }

          .header-button {
            width: 36px;
            height: 36px;
            font-size: 16px;
          }

          .dashboard-layout.menu-abierto::after {
            top: 70px;
          }
        }

        @media (max-width: 380px) {
          .brand-text strong {
            font-size: 12px;
          }

          .logo-sena {
            width: 32px;
            height: 32px;
          }

          .header-left {
            gap: 7px;
          }
        }
      `}</style>
    </>
  );
}
