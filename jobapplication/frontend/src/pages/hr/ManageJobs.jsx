import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api';

export default function ManageJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/jobs/all').then((res) => {
      setJobs(res.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const toggleActive = async (job) => {
    try {
      const updated = await api.put(`/jobs/${job.id}`, { ...job, isActive: !job.isActive });
      setJobs((prev) => prev.map((j) => (j.id === job.id ? updated.data : j)));
    } catch (err) {
      alert('Failed to update job status');
    }
  };

  const deleteJob = async (id) => {
    if (!confirm('Delete this job posting? This cannot be undone.')) return;
    try {
      await api.delete(`/jobs/${id}`);
      setJobs((prev) => prev.filter((j) => j.id !== id));
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to delete job');
    }
  };

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-1">Job Postings</h1>
            <p className="text-purple-100">Manage your open positions</p>
          </div>
          <Link
            to="/hr/jobs/new"
            className="bg-white text-purple-700 font-semibold px-5 py-2.5 rounded-xl hover:bg-purple-50 transition-colors"
          >
            + New Job
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {jobs.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
            <p className="text-gray-500 text-lg mb-4">No job postings yet</p>
            <Link to="/hr/jobs/new" className="bg-purple-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-purple-700 transition-colors">
              Create your first posting
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {jobs.map((job) => (
              <div key={job.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${job.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                        {job.isActive ? 'Active' : 'Inactive'}
                      </span>
                      <span className="text-xs bg-indigo-100 text-indigo-700 px-2.5 py-1 rounded-full font-semibold">
                        {job.department}
                      </span>
                      {job._count && (
                        <span className="text-xs text-gray-400">{job._count.applications} application{job._count.applications !== 1 ? 's' : ''}</span>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{job.title}</h3>
                    <div className="flex flex-wrap gap-3 text-sm text-gray-500 mb-2">
                      <span>{job.location}</span>
                      {job.salaryRange && <span>• {job.salaryRange}</span>}
                    </div>
                    <p className="text-sm text-gray-500 line-clamp-1">{job.description.split('\n')[0]}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => toggleActive(job)}
                      className={`text-sm font-medium px-4 py-2 rounded-xl transition-colors ${
                        job.isActive
                          ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                          : 'bg-green-100 text-green-700 hover:bg-green-200'
                      }`}
                    >
                      {job.isActive ? 'Deactivate' : 'Activate'}
                    </button>
                    <Link
                      to={`/hr/jobs/${job.id}/edit`}
                      className="text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 px-4 py-2 rounded-xl transition-colors"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteJob(job.id)}
                      className="text-sm font-medium bg-red-50 text-red-600 hover:bg-red-100 px-4 py-2 rounded-xl transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
