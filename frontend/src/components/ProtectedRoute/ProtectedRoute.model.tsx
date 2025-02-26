import { isTokenValid } from '../../services/authService';

export const useProtectedRouteModel = () => isTokenValid();
