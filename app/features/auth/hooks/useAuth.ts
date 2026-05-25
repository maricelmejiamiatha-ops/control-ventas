import { useAppSelector } from "@/app/store/hooks";
import {
  selectAuthUser,
  selectAuthLoading,
  selectAuthError,
  selectIsAuthenticated,
} from "../store/auth.selectors";

export const useAuth = () => {
  const user = useAppSelector(selectAuthUser);
  const loading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  return { user, loading, isAuthenticated, error };
};
