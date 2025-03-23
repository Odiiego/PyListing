import { jwtDecode } from 'jwt-decode';
import { IDecodedToken, IToken } from './authServices.type';

const getTokenFromStorage = (): string | null => localStorage.getItem('token');

export const login = (token: IToken) => {
  localStorage.setItem('token', JSON.stringify(token));
};

export const logout = () => {
  localStorage.removeItem('token');
};

export const isTokenValid = (): boolean => {
  const token = getTokenFromStorage();
  if (!token) return false;

  try {
    const decoded = jwtDecode<IDecodedToken>(token);
    if (!decoded.exp) throw new Error('Token sem data de expiração');

    const isExpired = decoded.exp * 1000 < Date.now();
    if (isExpired) {
      logout();
      return false;
    }

    return true;
  } catch (error) {
    console.error('Erro ao validar token:', error);
    logout();
    return false;
  }
};

export const getUserId = (): number | undefined => {
  if (!isTokenValid()) return undefined;

  try {
    const token = getTokenFromStorage();
    if (!token) return undefined;

    const decoded = jwtDecode<IDecodedToken>(token);
    return decoded.id;
  } catch (error) {
    console.error('Erro ao obter ID do usuário:', error);
    return undefined;
  }
};

export const getUserToken = (): IToken | undefined => {
  if (!isTokenValid()) return undefined;

  const token = getTokenFromStorage();
  return token ? JSON.parse(token) : undefined;
};

export const getAuthHeaders = (userToken: IToken | undefined) => {
  if (!userToken) throw new Error('Token de usuário não encontrado');

  return {
    Authorization: `Bearer ${userToken.access_token}`,
    'Content-Type': 'application/json',
  };
};
