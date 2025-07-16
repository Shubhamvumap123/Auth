import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

const login = async (email: string, password: string) => {
  const res = await axios.post("http://localhost:3000/api/login", { email, password });

  // Save user and token
  setUser(res.data.user);
  localStorage.setItem("user", JSON.stringify(res.data.user));
  localStorage.setItem("token", res.data.token);
};

const logout = () => {
  // Clear user and token
  setUser(null);
  localStorage.removeItem("user");

  localStorage.removeItem("token");
};


  const updateUser = (user: User) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
