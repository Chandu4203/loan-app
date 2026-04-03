import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/client';

const STATUS_COLORS = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  APPROVED: 'bg-green-100 text-green-800',
  REJECTED: 'bg-red-100 text-red-800',
};

export default function Dashboard() {
  const navigate = useNavigate();
  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem('user') || '{}');
    } catch {
      return {};
    }
  })();
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .get('/loans')
      .then(({ data }) => setLoans(data))
      .catch(() => setError('Failed to load loans'))
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const handleStatusChange = async (id, status) => {
    try {
      const { data } = await api.patch(`/loans/${id}/status`, { status });
      setLoans((prev) => prev.map((l) => (l.id === id ? data : l)));
    } catch {
      alert('Failed to update status');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-700 text-white px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Loan App</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm">
            {user.name} ({user.role})
          </span>
          <Link
            to="/apply"
            className="bg-white text-blue-700 px-3 py-1 rounded-lg text-sm font-semibold hover:bg-blue-50"
          >
            Apply for Loan
          </Link>
          <button onClick={handleLogout} className="text-sm underline hover:text-blue-200">
            Logout
          </button>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto py-8 px-4">
        <h2 className="text-2xl font-semibold mb-6">
          {user.role === 'ADMIN' ? 'All Loan Applications' : 'My Loan Applications'}
        </h2>

        {loading && <p className="text-gray-500">Loading…</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && loans.length === 0 && (
          <div className="bg-white rounded-2xl shadow p-8 text-center text-gray-500">
            No loans yet.{' '}
            <Link to="/apply" className="text-blue-600 hover:underline">
              Apply now
            </Link>
            .
          </div>
        )}

        <div className="space-y-4">
          {loans.map((loan) => (
            <div key={loan.id} className="bg-white rounded-2xl shadow p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="font-semibold text-gray-800">${loan.amount.toLocaleString()} – {loan.purpose}</p>
                <p className="text-sm text-gray-500">Term: {loan.termMonths} months</p>
                <p className="text-xs text-gray-400 mt-1">{new Date(loan.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${STATUS_COLORS[loan.status]}`}>
                  {loan.status}
                </span>
                {user.role === 'ADMIN' && loan.status === 'PENDING' && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleStatusChange(loan.id, 'APPROVED')}
                      className="text-xs bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleStatusChange(loan.id, 'REJECTED')}
                      className="text-xs bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
