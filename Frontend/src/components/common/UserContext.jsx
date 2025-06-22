import { createContext, useContext, useState, useEffect } from "react";

// Create the User Context
const UserContext = createContext();

// Custom hook to use user context
export const useUser = () => {
  return useContext(UserContext);
};

// Define the default user (Sudhir Sharma)
const defaultUser = {
  name: "Sudhir Sharma",
  role: "owner",
  profilePicUrl:
    "https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?q=80&w=1985&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
};

// UserContext provider component
export const UserProvider = ({ children }) => {
  // Load user from localStorage or use defaultUser
  const [user, setUser] = useState(() => {
    // const storedUser = localStorage.getItem("user");
    // return storedUser ? JSON.parse(storedUser) : defaultUser;
    return defaultUser;
  });

  // Sync user to localStorage on change
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
