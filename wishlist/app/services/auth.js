import axios from 'axios';

// Функція для логіну
export const loginUser = async (username, password) => {
  try {
    const response = await axios.post('https://localhost:7168/api/Account/login', {
      username,
      password,
    });

    const { token } = response.data;

    // Зберігаємо токен в sessionStorage
    sessionStorage.setItem('token', token);

    return true;
  } catch (error) {
    console.error('Login error:', error);
    return false;
  }
};

// Функція для реєстрації
export const registerUser = async (username, password, confirmPassword) => {
  try {
    const response = await axios.post('https://localhost:7168/api/Account/register', {
      username,
      password,
      confirmPassword, // Додано confirmPassword
    });

    const { token } = response.data;

    // Зберігаємо токен в sessionStorage
    sessionStorage.setItem('token', token);

    return true;
  } catch (error) {
    console.error('Registration error:', error.response?.data || error.message);
    return false;
  }
};
