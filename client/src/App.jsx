import React, { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import Auth from './pages/auth';
import Profile from './pages/profile';
import Chat from './pages/chat';
import { useAppStore } from './store';
import { apiClient } from './lib/api-client';
import { GET_USER_INFO } from './utils/constants';

const LoadingScreen = () => (
  <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-500 mb-6" />
    <p className="text-lg sm:text-xl font-medium text-center px-6">
      Just a moment... we're setting things up for you 💜
    </p>
  </div>
);


const PrivateRoute = ({ children, loading }) => {
  const { userInfo } = useAppStore();

  if (loading) return <LoadingScreen />

  return userInfo ? children : <Navigate to="/auth" />;
};

const AuthRoute = ({ children, loading }) => {
  const { userInfo } = useAppStore();

  if (loading) return <LoadingScreen />

  return userInfo ? <Navigate to="/chat" /> : children;
};

const App = () => {
  const { userInfo, setUserInfo } = useAppStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await apiClient.get(GET_USER_INFO, { withCredentials: true });
        if (response.status === 200 && response.data.id) {
          setUserInfo(response.data);
        } else {
          setUserInfo(undefined);
        }
      } catch (error) {
        setUserInfo(undefined);
      } finally {
        setLoading(false); // ✅ Finish loading after auth check
      }
    };

    if (!userInfo) {
      getUserData();
    } else {
      setLoading(false);
    }
  }, [userInfo, setUserInfo]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/auth"
          element={
            <AuthRoute loading={loading}>
              <Auth />
            </AuthRoute>
          }
        />

        <Route
          path="/chat"
          element={
            <PrivateRoute loading={loading}>
              <Chat />
            </PrivateRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <PrivateRoute loading={loading}>
              <Profile />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
