import { getCurrentUser } from "@/services/AuthServices";
import { TLoggedInUser } from "@/types/user.types";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

// User Provider Types
type TUserProvider = {
  user: TLoggedInUser | null;
  isLoading: boolean;
  setUser: (user: TLoggedInUser | null) => void;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  contextLogout: () => void;
  refreshUser: () => Promise<void>;
};

// Create Context
const UserContext = createContext<TUserProvider | undefined>(undefined);

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<TLoggedInUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Get Current User and Set
  const handleUser = async () => {
    try {
      const userData = await getCurrentUser();
      setUser(userData);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };
  const refreshUser = async () => {
    setIsLoading(true);
    await handleUser();
  };

  useEffect(() => {
    handleUser();
  }, []);

  const contextLogout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isLoading,
        setIsLoading,
        contextLogout,
        refreshUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Create Hook
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser Must be used within the UserProvider Context");
  }

  return context;
};

export default UserProvider;
