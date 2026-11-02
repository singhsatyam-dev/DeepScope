import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkAuth } from "../../features/auth/authSlice";

function AuthInitializer({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return children;
}

export default AuthInitializer;
