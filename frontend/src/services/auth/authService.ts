import { jwtDecode } from 'jwt-decode';

type token = {
  access_token: string;
  token_type: string;
};

export const login = (token: token) => {
  localStorage.setItem('token', JSON.stringify(token));
};

export const logout = () => {
  localStorage.removeItem('token');
};

export const isTokenValid = () => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const decoded = jwtDecode(token);
      if (!decoded.exp) throw new Error('Invalid expiration date');
      const isExpired = decoded.exp * 1000 < Date.now();
      if (isExpired) {
        logout();
        return false;
      }
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
  return false;
};
