import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api';
import { useAuth } from '../../context/AuthContext';

const StatCard = ({ label, value, icon, color }) => (
  <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 p-6`}>
    <div className="flex items-center justify-between mb-3">
      <span className={`text-2xl p-2 rounded-xl ${color}`}>{icon}</span>
      <span className="text-3xl font-extrabold text-gray-900">{value}</span>
    </div>
    <p className="text-sm font-medium text-gray-500">{label}</p>
  </div>
);

export default function HRDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [recentApps, setRecentApps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get('/hr/stats'),
      api.get('/hr/applications?status=PENDING'),
    ]).then(([statsRes, appsRes]) => {
      setStats(statsRes.data);
      setRecentApps(appsRes.data.slice(0, 5));
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-1">HR Dashboard</h1>
          <p className="text-purple-100">Welcome back, {user?.name}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {stats && (
          <>
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Overview</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <StatCard label="Active Jobs" value={stats.jobs.active} icon="💼" color="bg-blue-50" />
              <StatCard label="Total Applications" value={stats.applications.total} icon="📋" color="bg-purple-50" />
              <StatCard label="Pending Review" value={stats.applications.pending} icon="⏳" color="bg-yellow-50" />
              <StatCard label="Accepted" value={stats.applications.accepted} icon="✅" color="bg-green-50" />
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <StatCard label="Under Review" value={stats.applications.reviewing} icon="🔍" color="bg-blue-50" />
              <StatCard label="Rejected" value={stats.applications.rejected} icon="❌" color="bg-red-50" />
            </div>
          </>
        )}

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Link to="/hr/jobs/new" className="bg-purple-600 hover:bg-purple-700 text-white rounded-2xl p-6 transition-colors group">
            <div className="text-2xl mb-3">➕</div>
            <h3 className="font-bold text-lg mb-1">Post New Job</h3>
            <p className="text-purple-100 text-sm">Create a new job opening</p>
          </Link>
          <Link to="/hr/applications" className="bg-white hover:bg-gray-50 border border-gray-200 rounded-2xl p-6 transition-colors group">
            <div className="text-2xl mb-3">📋</div>
            <h3 className="font-bold text-lg text-gray-900 mb-1">Review Applications</h3>
            <p className="text-gray-500 text-sm">View and manage all applications</p>
          </Link>
          <Link to="/hr/jobs" className="bg-white hover:bg-gray-50 border border-gray-200 rounded-2xl p-6 transition-colors group">
            <div className="text-2xl mb-3">💼</div>
            <h3 className="font-bold text-lg text-gray-900 mb-1">Manage Jobs</h3>
            <p className="text-gray-500 text-sm">View and edit job postings</p>
          </Link>
        </div>

        {/* Recent pending applications */}
        {recentApps.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Recent Pending Applications</h2>
              <Link to="/hr/applications" className="text-sm text-purple-600 hover:text-purple-800 font-medium">
                View all →
              </Link>
            </div>
            <div className="space-y-3">
              {recentApps.map((app) => (
                <div key={app.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <p className="font-semibold text-gray-900">{app.applicant.name}</p>
                    <p className="text-sm text-gray-500">{app.jobPosting.title}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full font-medium">Pending</span>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(app.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
