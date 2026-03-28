import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api';

const statusConfig = {
  PENDING: { label: 'Pending', color: 'bg-yellow-100 text-yellow-700', icon: '⏳' },
  REVIEWING: { label: 'Under Review', color: 'bg-blue-100 text-blue-700', icon: '🔍' },
  ACCEPTED: { label: 'Accepted', color: 'bg-green-100 text-green-700', icon: '✅' },
  REJECTED: { label: 'Rejected', color: 'bg-red-100 text-red-700', icon: '❌' },
};

export default function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [withdrawing, setWithdrawing] = useState(null);

  useEffect(() => {
    api.get('/applications/my').then((res) => {
      setApplications(res.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const handleWithdraw = async (id) => {
    if (!confirm('Are you sure you want to withdraw this application?')) return;
    setWithdrawing(id);
    try {
      await api.delete(`/applications/${id}`);
      setApplications((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to withdraw application');
    } finally {
      setWithdrawing(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-2">My Applications</h1>
          <p className="text-indigo-100">Track the status of your job applications</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {applications.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-gray-500 text-lg font-medium mb-2">No applications yet</p>
            <p className="text-gray-400 text-sm mb-6">Start applying to open positions</p>
            <Link
              to="/applicant/jobs"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              Browse Jobs
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-gray-500">{applications.length} application{applications.length !== 1 ? 's' : ''}</p>
            {applications.map((app) => {
              const status = statusConfig[app.status] || statusConfig.PENDING;
              return (
                <div key={app.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${status.color}`}>
                          {status.icon} {status.label}
                        </span>
                        <span className="text-xs text-gray-400">
                          Applied {new Date(app.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">{app.jobPosting.title}</h3>
                      <div className="flex flex-wrap gap-3 mt-1 text-sm text-gray-500">
                        <span>{app.jobPosting.department}</span>
                        <span>•</span>
                        <span>{app.jobPosting.location}</span>
                      </div>
                      {app.coverLetter && (
                        <p className="mt-3 text-sm text-gray-600 line-clamp-2 bg-gray-50 p-3 rounded-lg">
                          <span className="font-medium">Cover Letter:</span> {app.coverLetter}
                        </p>
                      )}
                      {app.reviewer && (
                        <p className="mt-2 text-xs text-gray-400">Reviewed by: {app.reviewer.name}</p>
                      )}
                    </div>
                    {app.status === 'PENDING' && (
                      <button
                        onClick={() => handleWithdraw(app.id)}
                        disabled={withdrawing === app.id}
                        className="flex-shrink-0 text-sm text-red-500 hover:text-red-700 border border-red-200 hover:border-red-400 px-4 py-2 rounded-xl transition-colors disabled:opacity-50"
                      >
                        {withdrawing === app.id ? 'Withdrawing...' : 'Withdraw'}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
