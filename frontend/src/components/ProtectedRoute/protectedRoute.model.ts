import { isTokenValid } from '../../services/auth/authService';

export const useProtectedRouteModel = () => isTokenValid();
