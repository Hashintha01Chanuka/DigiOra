import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import HomePageEditor from './components/editors/AddImage';
import ServicesPageEditor from './components/editors/AddService';
import ContactPageEditor from './components/editors/ContactPageEditor';
import NavbarEditor from './components/editors/NavbarEditor';
import FooterEditor from './components/editors/FooterEditor';
import Settings from './components/Settings';
import './App.css';
import AddImage from './components/editors/AddImage';
import AddVideo from './components/editors/AddVideo';
import AddService from './components/editors/AddService';
import AboutPageEditor from './components/editors/AboutPageEditor';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const AdminLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden ml-64">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <Dashboard />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/add-image"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <AddImage />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/add-video"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <AddVideo />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/add-service"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <AddService />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/about-page"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <AboutPageEditor />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/contact"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <ContactPageEditor />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/navbar"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <NavbarEditor />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/footer"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <FooterEditor />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <Settings />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/services"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <AddService />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};


export default App;
