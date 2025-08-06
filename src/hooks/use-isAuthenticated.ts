import { useAuth } from "./use-auth";

export const useIsAuthenticated = () => {
  const { user } = useAuth();
  return user !== null;
};
