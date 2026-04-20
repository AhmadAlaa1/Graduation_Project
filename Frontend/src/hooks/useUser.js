// hooks/useUser.js
import { useDispatch, useSelector } from "react-redux";
import {
  getMyInfo,
  editProfile,
  clearUserState,
  selectProfile,
  selectUserLoading,
  selectUserError,
  selectUserSuccess,
  deleteAccount,
} from "../store/slices/userSlice";

export function useUser() {
  const dispatch = useDispatch();

  const profile = useSelector(selectProfile);
  const loading = useSelector(selectUserLoading);
  const error = useSelector(selectUserError);
  const success = useSelector(selectUserSuccess);

  const fetchMyInfo = () => dispatch(getMyInfo());
  const removeAccount = () => dispatch(deleteAccount()).unwrap();
  // userDto = plain object with profile fields
  // cvFile  = File object or null
  const updateProfile = (userDto, cvFile = null) =>
    dispatch(editProfile({ userDto, cvFile }));

  const clearState = () => dispatch(clearUserState());

  return { profile, loading, error, success, fetchMyInfo, updateProfile, clearState, removeAccount };
}
