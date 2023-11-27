import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import axios from '../api/axios';

interface UserData {
  id: number;
  profilePicName: string;
  bannerFileName: string;
  firstName: string;
  surname: string;
  bio: string;
}

interface UserContextProps {
  userData: UserData | null;
  loading: boolean;
  fetchUserData: (userId: string) => void;
  numberFriends: number | null;
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
  const [numberFriends, setNumberFriends] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

const fetchUserData = async (userId: string) => {
  try {
    const response = await axios.get<UserData>(`/User/${userId}`);
    const fetchedUserData = response.data;

    // Check if fetchedUserData is not null before proceeding
    if (fetchedUserData) {
      setUserData(fetchedUserData);

      const GET_FRIENDS_NUMBER = `/Friend/sumOfFriends/${fetchedUserData.id}`;
      const friendsResponse = await axios.get(GET_FRIENDS_NUMBER);
      setNumberFriends(friendsResponse.data);
    }

    setLoading(false);
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};



  const contextValue: UserContextProps = {
    userData,
    loading,
    fetchUserData,
    numberFriends
  };

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};
