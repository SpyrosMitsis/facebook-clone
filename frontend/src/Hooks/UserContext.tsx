import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import axios from '../api/axios';

interface UserData {
  profilePicName: string;
  bannerFileName: string;
  firstName: string;
  surname: string;
  // Add other properties from your user data here
}

interface UserContextProps {
  userData: UserData | null;
  loading: boolean;
  fetchUserData: (userId: string) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserContextProvider');
  }
  return context;
};

export const UserContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async (userId: string) => {
    try {
      const response = await axios.get<UserData>(`/User/${userId}`);
      setUserData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    // Fetch initial user data here if needed
  }, []);

  const contextValue: UserContextProps = {
    userData,
    loading,
    fetchUserData,
  };

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};
