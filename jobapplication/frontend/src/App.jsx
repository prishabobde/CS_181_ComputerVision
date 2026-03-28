import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import Login from './pages/Login';

import JobsList from './pages/applicant/JobsList';
import JobDetail from './pages/applicant/JobDetail';
import MyApplications from './pages/applicant/MyApplications';

import HRDashboard from './pages/hr/Dashboard';
import ManageJobs from './pages/hr/ManageJobs';
import JobForm from './pages/hr/JobForm';
import HRApplications from './pages/hr/Applications';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              {/* Public */}
              <Route path="/" element={<Home />} />
              <Route path="/login/:role" element={<Login />} />

              {/* Applicant routes */}
              <Route path="/applicant/jobs" element={<JobsList />} />
              <Route path="/applicant/jobs/:id" element={<JobDetail />} />
              <Route
                path="/applicant/applications"
                element={
                  <ProtectedRoute role="APPLICANT">
                    <MyApplications />
                  </ProtectedRoute>
                }
              />

              {/* HR routes */}
              <Route
                path="/hr/dashboard"
                element={
                  <ProtectedRoute role="HR">
                    <HRDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/hr/jobs"
                element={
                  <ProtectedRoute role="HR">
                    <ManageJobs />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/hr/jobs/new"
                element={
                  <ProtectedRoute role="HR">
                    <JobForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/hr/jobs/:id/edit"
                element={
                  <ProtectedRoute role="HR">
                    <JobForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/hr/applications"
                element={
                  <ProtectedRoute role="HR">
                    <HRApplications />
                  </ProtectedRoute>
                }
              />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}
