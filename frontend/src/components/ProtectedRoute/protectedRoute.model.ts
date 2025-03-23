import { isTokenValid } from '../../services/auth/authServices';

export const useProtectedRouteModel = () => isTokenValid();
