import { RouteProps } from 'react-router-dom';
import { useProtectedRouteModel } from './protectedRoute.model';
import ProtectedRouteView from './protectedRoute.view';

type ProtectedRouteProps = {
  component: React.ComponentType<unknown>;
} & RouteProps;

export default function ProtectedRoute({
  component: Component,
  ...rest
}: ProtectedRouteProps) {
  const isAuthenticated = useProtectedRouteModel();

  return (
    <ProtectedRouteView
      isAuthenticated={isAuthenticated}
      component={Component}
      {...rest}
    />
  );
}
