'use client';

import { useState } from 'react';
import { authenticateAdmin } from '@/lib/auth';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const success = await authenticateAdmin(password);

    if (success) {
      router.refresh();
    } else {
      setError('Invalid password');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Static blurred blobs (NO animation) */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl" />

      {/* Card */}
      <div className="bg-white/10 backdrop-blur-xl p-10 rounded-3xl shadow-2xl w-full max-w-md border border-white/20 animate-fade-in">
        <h1 className="text-3xl font-bold mb-8 text-center text-white">
          Admin Login
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2 text-gray-200">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-4 border border-white/30 bg-white/10 rounded-xl focus:ring-2 focus:ring-white focus:border-transparent text-white placeholder-gray-400 transition"
              placeholder="Enter admin password"
              required
            />
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 text-red-200 rounded-xl">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-gray-900 py-4 rounded-xl font-bold hover:scale-[1.02] active:scale-[0.98] transition disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-3">
                <span className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
                Logging in...
              </span>
            ) : (
              'Login'
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-400 text-sm">
          Secure Admin Access
        </p>
      </div>
    </div>
  );
}