import { RouteProps, Navigate } from 'react-router-dom';
import React from 'react';

type ProtectedRouteViewProps = {
  isAuthenticated: boolean;
  component: React.ComponentType;
} & RouteProps;

export default function ProtectedRouteView({
  component: Component,
  isAuthenticated,
}: ProtectedRouteViewProps) {
  return isAuthenticated ? <Component /> : <Navigate to="/auth/signin" />;
}
