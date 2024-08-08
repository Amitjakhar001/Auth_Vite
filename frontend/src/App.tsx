import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import NuserDashboard from './pages/NuserDashboard';
import NotFound from './pages/NotFound';
import PuserDashboard from './pages/PuserDashboard';
import { useAuth } from './context/AuthContext';
import  UserManagement  from './pages/UserManagement';
import CreateUser from './pages/CreateUser';
import EditUser from './pages/EditUser';
import DeleteUser from './pages/DeleteUser';

// ProtectedRoute component to handle role-based access
const ProtectedRoute = ({ children, allowedRoles }) => {
  const auth = useAuth();

  if (!auth.isLoggedIn) {
    // Redirect to the login page if not logged in
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(auth.user?.role)) {
    // Redirect to the home page if the user role is not allowed
    return <Navigate to="/" replace />;
  }
  return children;
}

function App() {
  return (
    <main>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admindashboard" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        }/>
        <Route path="/puserdashboard" element={
          <ProtectedRoute allowedRoles={['poweruser']}>
            <PuserDashboard />
          </ProtectedRoute>
        }/>
        <Route path="/nuserdashboard" element={
          <ProtectedRoute allowedRoles={['normaluser']}>
            <NuserDashboard />
          </ProtectedRoute>
        }/>


        <Route path="/admindashboard/usermanagement" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <UserManagement />
          </ProtectedRoute>
        }/>

        <Route path="/admindashboard/usermanagement/createuser" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <CreateUser />
          </ProtectedRoute>
        }/>

        <Route path="/admindashboard/usermanagement/edituser" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <EditUser />
          </ProtectedRoute>
        }/>

        <Route path="/admindashboard/usermanagement/deleteuser" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <DeleteUser />
          </ProtectedRoute>
        }/>




        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  );
}

export default App;
