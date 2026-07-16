import '../global.css';

import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState, createContext, useContext } from 'react';

export type UserData = {
  name: string;
  isLoggedIn: boolean;
};

export const AuthContext = createContext<{
  user: UserData;
  login: (name: string) => void;
  logout: () => void;
}>({
  user: { name: '', isLoggedIn: false },
  login: () => {},
  logout: () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export default function RootLayout() {
  const [user, setUser] = useState<UserData>({ name: '', isLoggedIn: false });

  const login = (name: string) => {
    setUser({ name, isLoggedIn: true });
  };

  const logout = () => {
    setUser({ name: '', isLoggedIn: false });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </AuthContext.Provider>
  );
}
