import { useProtectedRouteModel } from './protectedRoute.model';
import ProtectedRouteView from './protectedRoute.view';

type ProtectedRouteProps = {
  component: React.ComponentType;
};

export default function ProtectedRoute({
  component: Component,
}: ProtectedRouteProps) {
  const isAuthenticated = useProtectedRouteModel();

  return (
    <ProtectedRouteView
      isAuthenticated={!!isAuthenticated}
      component={Component}
    />
  );
}
