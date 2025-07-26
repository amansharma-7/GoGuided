import { createContext, useContext, useState, useEffect } from "react";
import useApi from "../hooks/useApi";
import { getMe } from "../services/authService";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const setUserContext = (userData) => {
    setUser(userData);
  };

  const { request } = useApi(getMe);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await request({});
        setUserContext(response?.user);
      } catch (err) {
        if (
          err.response?.status === 401 ||
          err.response?.status === 403 ||
          err.response?.status === 404
        ) {
          setUserContext(null);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider
      value={{ isUserLoading: loading, user, setUserContext }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
