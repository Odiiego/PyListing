import { useProtectedRouteModel } from './ProtectedRoute.model';
import { RouteProps, Navigate } from 'react-router-dom';

import React from 'react';

type ProtectedRouteViewProps = {
  isAuthenticated: ReturnType<typeof useProtectedRouteModel>;
  component: React.ComponentType<unknown>;
} & RouteProps;

export default function ProtectedRouteView({
  component: Component,
  isAuthenticated,
}: ProtectedRouteViewProps) {
  return (
    <>{isAuthenticated ? <Component /> : <Navigate to="/auth/signin" />}</>
  );
}
