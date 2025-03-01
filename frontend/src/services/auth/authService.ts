import { jwtDecode } from 'jwt-decode';
import { IDecodedToken, IToken } from './authService.type';

export const login = (token: IToken) => {
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

export const getUserId = () => {
  const token = localStorage.getItem('token');
  if (token && isTokenValid()) {
    try {
      const decoded: IDecodedToken = jwtDecode(token);
      if (!decoded.id) throw new Error('Invalid id');

      return decoded.id;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }
  return undefined;
};

export const getUserToken = (): IToken | undefined => {
  const token = localStorage.getItem('token');
  if (token && isTokenValid()) {
    return JSON.parse(token);
  }
  return undefined;
};
