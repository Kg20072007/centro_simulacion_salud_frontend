import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(() => {
    const guardado = localStorage.getItem("usuario");

    if (!guardado) {
      return null;
    }

    try {
      return JSON.parse(guardado);
    } catch {
      localStorage.removeItem("usuario");
      return null;
    }
  });

  const login = (datos) => {
    localStorage.setItem("usuario", JSON.stringify(datos));
    setUsuario(datos);
  };

  const logout = () => {
    localStorage.removeItem("usuario");
    setUsuario(null);
  };

  const register = (datos) => {
    const usuarios = JSON.parse(
      localStorage.getItem("usuarios") || "[]"
    );

    usuarios.push(datos);

    localStorage.setItem(
      "usuarios",
      JSON.stringify(usuarios)
    );

    login(datos);
  };

  return (
    <AuthContext.Provider
      value={{
        usuario,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}