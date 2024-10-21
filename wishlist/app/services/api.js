const API_BASE_URL = 'https://localhost:7168/api';

export const api = {
  login: async (username, password) => {
    const response = await fetch(`${API_BASE_URL}/Account/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed');
    }
    return response.json();
  },

  register: async (username, password, confirmPassword) => {
    const response = await fetch(`${API_BASE_URL}/Account/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password, confirmPassword }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.log('Registration error:', errorData);  // For debugging
      throw new Error(errorData.message || 'Registration failed');
    }
    return response.json();
  }
};
