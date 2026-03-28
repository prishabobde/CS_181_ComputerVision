import { useState, useEffect } from 'react';
import api from '../../api';

const statusConfig = {
  PENDING: { label: 'Pending', color: 'bg-yellow-100 text-yellow-700' },
  REVIEWING: { label: 'Reviewing', color: 'bg-blue-100 text-blue-700' },
  ACCEPTED: { label: 'Accepted', color: 'bg-green-100 text-green-700' },
  REJECTED: { label: 'Rejected', color: 'bg-red-100 text-red-700' },
};

const statuses = ['ALL', 'PENDING', 'REVIEWING', 'ACCEPTED', 'REJECTED'];

export default function HRApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');
  const [updating, setUpdating] = useState(null);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const res = await api.get('/hr/applications');
      setApplications(res.data);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    setUpdating(id);
    try {
      const res = await api.patch(`/hr/applications/${id}/status`, { status });
      setApplications((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status: res.data.status, reviewer: res.data.reviewer } : a))
      );
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to update status');
    } finally {
      setUpdating(null);
    }
  };

  const filtered = filter === 'ALL' ? applications : applications.filter((a) => a.status === filter);

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
          <h1 className="text-3xl font-bold mb-1">Applications</h1>
          <p className="text-purple-100">Review and manage candidate applications</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {statuses.map((s) => {
            const count = s === 'ALL' ? applications.length : applications.filter((a) => a.status === s).length;
            return (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  filter === s
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-purple-300'
                }`}
              >
                {s === 'ALL' ? 'All' : statusConfig[s].label}{' '}
                <span className={`ml-1 text-xs px-1.5 py-0.5 rounded-full ${filter === s ? 'bg-purple-500' : 'bg-gray-100 text-gray-500'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
            <p className="text-gray-500 text-lg">No applications found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((app) => {
              const status = statusConfig[app.status];
              const isExpanded = expanded === app.id;
              return (
                <div key={app.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <div
                    className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => setExpanded(isExpanded ? null : app.id)}
                  >
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${status.color}`}>
                            {status.label}
                          </span>
                          <span className="text-xs text-gray-400">
                            {new Date(app.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 mb-1">
                          <h3 className="text-lg font-bold text-gray-900">{app.applicant.name}</h3>
                          <span className="text-gray-400">→</span>
                          <span className="text-gray-700 font-medium">{app.jobPosting.title}</span>
                        </div>
                        <div className="flex flex-wrap gap-3 text-sm text-gray-500">
                          <span>{app.applicant.email}</span>
                          <span>•</span>
                          <span>{app.jobPosting.department}</span>
                          <span>•</span>
                          <span>{app.jobPosting.location}</span>
                        </div>
                      </div>
                      <svg
                        className={`w-5 h-5 text-gray-400 transition-transform flex-shrink-0 ${isExpanded ? 'rotate-180' : ''}`}
                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="border-t border-gray-100 p-6 bg-gray-50">
                      {app.coverLetter ? (
                        <div className="mb-5">
                          <h4 className="text-sm font-semibold text-gray-700 mb-2">Cover Letter</h4>
                          <p className="text-sm text-gray-600 bg-white p-4 rounded-xl border border-gray-200 leading-relaxed whitespace-pre-wrap">
                            {app.coverLetter}
                          </p>
                        </div>
                      ) : (
                        <p className="text-sm text-gray-400 italic mb-5">No cover letter provided</p>
                      )}

                      {app.resumeUrl && (
                        <div className="mb-5">
                          <h4 className="text-sm font-semibold text-gray-700 mb-2">Resume</h4>
                          <a
                            href={app.resumeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-indigo-600 hover:text-indigo-800 underline"
                          >
                            {app.resumeUrl}
                          </a>
                        </div>
                      )}

                      {app.reviewer && (
                        <p className="text-xs text-gray-400 mb-4">Reviewed by: {app.reviewer.name}</p>
                      )}

                      <div>
                        <h4 className="text-sm font-semibold text-gray-700 mb-3">Update Status</h4>
                        <div className="flex flex-wrap gap-2">
                          {['PENDING', 'REVIEWING', 'ACCEPTED', 'REJECTED'].map((s) => (
                            <button
                              key={s}
                              onClick={() => updateStatus(app.id, s)}
                              disabled={app.status === s || updating === app.id}
                              className={`text-sm font-medium px-4 py-2 rounded-xl transition-all ${
                                app.status === s
                                  ? `${statusConfig[s].color} opacity-60 cursor-not-allowed`
                                  : 'bg-white border border-gray-200 text-gray-700 hover:border-purple-400 hover:text-purple-700'
                              } disabled:cursor-not-allowed`}
                            >
                              {updating === app.id ? '...' : statusConfig[s].label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
