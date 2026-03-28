import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-indigo-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-indigo-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight">Prisma Company</span>
          </Link>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                {user.role === 'HR' && (
                  <div className="hidden sm:flex items-center gap-4">
                    <Link to="/hr/dashboard" className="text-indigo-100 hover:text-white text-sm font-medium transition-colors">
                      Dashboard
                    </Link>
                    <Link to="/hr/jobs" className="text-indigo-100 hover:text-white text-sm font-medium transition-colors">
                      Jobs
                    </Link>
                    <Link to="/hr/applications" className="text-indigo-100 hover:text-white text-sm font-medium transition-colors">
                      Applications
                    </Link>
                  </div>
                )}
                {user.role === 'APPLICANT' && (
                  <div className="hidden sm:flex items-center gap-4">
                    <Link to="/applicant/jobs" className="text-indigo-100 hover:text-white text-sm font-medium transition-colors">
                      Browse Jobs
                    </Link>
                    <Link to="/applicant/applications" className="text-indigo-100 hover:text-white text-sm font-medium transition-colors">
                      My Applications
                    </Link>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <div className="text-right hidden sm:block">
                    <div className="text-sm font-medium">{user.name}</div>
                    <div className="text-xs text-indigo-200 capitalize">{user.role.toLowerCase()}</div>
                  </div>
                  <div className="w-9 h-9 bg-indigo-500 rounded-full flex items-center justify-center font-bold text-sm">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="text-sm bg-indigo-600 hover:bg-indigo-500 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login/hr"
                  className="text-sm bg-white text-indigo-700 font-semibold px-4 py-2 rounded-lg hover:bg-indigo-50 transition-colors"
                >
                  HR Login
                </Link>
                <Link
                  to="/login/applicant"
                  className="text-sm bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-lg transition-colors font-medium"
                >
                  Applicant Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
