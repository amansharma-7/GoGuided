import { useEffect } from "react";
import { useUser } from "./context/UserContext";
import AppRouter from "./routes/AppRouter";
import { Toaster } from "react-hot-toast";

import { getMe } from "./services/authService";
import useApi from "./hooks/useApi";

function App() {
  const { setUserContext } = useUser();
  const { request } = useApi(getMe);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await request({});
        setUserContext(response?.user);
      } catch (err) {
        setUserContext(null);
      }
    };

    fetchUser();
  }, []);

  return (
    <>
      <AppRouter />
      <Toaster position="top-right" />
    </>
  );
}

export default App;
