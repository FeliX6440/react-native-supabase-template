import { createContext, useContext, useState, useEffect } from "react";
import { supabase, getCurrentUser } from "../helpers/supabase/supabase";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeUserSession = async () => {
      setIsLoading(true);
      const res = await getCurrentUser();
      if (res) {
        setIsLoggedIn(true);
        setUser(res);
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
      setIsLoading(false);
    };

    initializeUserSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user || null);
        setIsLoggedIn(!!session?.user);
        setIsLoading(false);
      }
    );

    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  return (
    <GlobalContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, user, setUser, isLoading }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
