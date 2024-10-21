import { createContext, useContext, useState } from 'react';

// Створюємо контекст для авторизації
const AuthContext = createContext();

// Провайдер контексту авторизації
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (username, password) => {
    // Логіка авторизації
    // Після успішного логіну встановлюємо користувача
    setUser({ username });
    localStorage.setItem('username', username);
  };

  const logout = () => {
    // Логіка для виходу з системи
    setUser(null);
    localStorage.removeItem('username');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Хук для використання контексту авторизації
export const useAuth = () => {
  return useContext(AuthContext);
};
