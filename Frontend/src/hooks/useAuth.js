import { useDispatch, useSelector } from "react-redux";
import {
  loginUser,
  registerUser,
  logout as logoutAction,
  clearStatus,
  selectUser,
  selectToken,
  selectIsLoggedIn,
  selectLoading,
  selectError,
  selectSuccess,
} from "../store/slices/authSlice";

export function useAuth() {
  const dispatch = useDispatch();

  // ── State ─────────────────────────────────────────────
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const success = useSelector(selectSuccess);

  // ── Actions ───────────────────────────────────────────

  const login = (credentials) => {
    return dispatch(loginUser(credentials));
  };

  const register = (userData) => {
    return dispatch(registerUser(userData));
  };

  const logout = () => {
    return dispatch(logoutAction());
  };

  const clearState = () => {
    return dispatch(clearStatus());
  };

  return {
    // state
    user,
    token,
    isLoggedIn,
    loading,
    error,
    success,

    // actions
    login,
    register,
    logout,
    clearState,
  };
}