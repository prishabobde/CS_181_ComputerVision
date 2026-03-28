import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-700 opacity-95"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-xl">
                <svg className="w-12 h-12 text-indigo-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </div>
            <h1 className="text-5xl sm:text-6xl font-extrabold text-white tracking-tight mb-4">
              Prisma Company
            </h1>
            <p className="text-xl sm:text-2xl text-indigo-200 font-medium mb-6">
              Application Portal
            </p>
            <p className="max-w-2xl mx-auto text-indigo-100 text-lg mb-12">
              Join our world-class team and help shape the future. We're building something extraordinary — come be part of it.
            </p>

            {user ? (
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                {user.role === 'HR' ? (
                  <Link
                    to="/hr/dashboard"
                    className="inline-flex items-center justify-center gap-2 bg-white text-indigo-700 font-bold px-8 py-4 rounded-xl text-lg shadow-lg hover:bg-indigo-50 transition-all hover:shadow-xl"
                  >
                    Go to HR Dashboard
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                ) : (
                  <Link
                    to="/applicant/jobs"
                    className="inline-flex items-center justify-center gap-2 bg-white text-indigo-700 font-bold px-8 py-4 rounded-xl text-lg shadow-lg hover:bg-indigo-50 transition-all hover:shadow-xl"
                  >
                    Browse Open Positions
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                )}
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  to="/login/applicant"
                  className="inline-flex items-center justify-center gap-3 bg-white text-indigo-700 font-bold px-8 py-4 rounded-xl text-lg shadow-lg hover:bg-indigo-50 transition-all hover:shadow-xl group"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Login as Applicant
                </Link>
                <Link
                  to="/login/hr"
                  className="inline-flex items-center justify-center gap-3 bg-indigo-800 bg-opacity-60 text-white border-2 border-white border-opacity-40 font-bold px-8 py-4 rounded-xl text-lg hover:bg-opacity-80 transition-all group"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Login as HR
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Wave decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 80L60 74.7C120 69.3 240 58.7 360 53.3C480 48 600 48 720 53.3C840 58.7 960 69.3 1080 69.3C1200 69.3 1320 58.7 1380 53.3L1440 48V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0Z" fill="white"/>
          </svg>
        </div>
      </div>

      {/* Portal Options */}
      {!user && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Choose Your Portal</h2>
          <p className="text-center text-gray-500 mb-12">Select your role to get started</p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Applicant Card */}
            <Link to="/login/applicant" className="group">
              <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-transparent hover:border-indigo-400 transition-all hover:shadow-xl hover:-translate-y-1 duration-200">
                <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-200 transition-colors">
                  <svg className="w-9 h-9 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Applicant Portal</h3>
                <p className="text-gray-500 mb-6 leading-relaxed">
                  Explore exciting career opportunities at Prisma Company. Browse open positions, submit applications, and track your application status in real time.
                </p>
                <ul className="space-y-2 mb-8">
                  {['Browse open job positions', 'Submit applications with cover letter', 'Track application status', 'Manage your profile'].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                      <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center gap-2 text-indigo-600 font-semibold group-hover:gap-3 transition-all">
                  Get Started
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>
            </Link>

            {/* HR Card */}
            <Link to="/login/hr" className="group">
              <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-transparent hover:border-purple-400 transition-all hover:shadow-xl hover:-translate-y-1 duration-200">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-200 transition-colors">
                  <svg className="w-9 h-9 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">HR Portal</h3>
                <p className="text-gray-500 mb-6 leading-relaxed">
                  Manage the entire hiring pipeline from one place. Post new positions, review incoming applications, and make data-driven hiring decisions.
                </p>
                <ul className="space-y-2 mb-8">
                  {['Post and manage job openings', 'Review all applications', 'Update application statuses', 'View hiring analytics dashboard'].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                      <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center gap-2 text-purple-600 font-semibold group-hover:gap-3 transition-all">
                  HR Login
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>
            </Link>
          </div>
        </div>
      )}

      {/* Stats / Features Section */}
      <div className="bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: 'Open Positions', value: '20+', icon: '💼' },
              { label: 'Team Members', value: '500+', icon: '👥' },
              { label: 'Countries', value: '15+', icon: '🌍' },
              { label: 'Years of Excellence', value: '10+', icon: '🏆' },
            ].map((stat) => (
              <div key={stat.label} className="p-4">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-extrabold text-indigo-700 mb-1">{stat.value}</div>
                <div className="text-gray-500 text-sm font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
