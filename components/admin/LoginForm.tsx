'use client';

import { useState } from 'react';
import { authenticateAdmin } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [90, 0, 90],
          opacity: [0.2, 0.1, 0.2],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-pink-500 to-orange-500 rounded-full blur-3xl"
      />

      <motion.div 
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ 
          type: "spring",
          stiffness: 100,
          damping: 15
        }}
        className="bg-white/10 backdrop-blur-2xl p-10 rounded-3xl shadow-2xl w-full max-w-md relative z-10 border border-white/20"
      >
        <motion.h1 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent"
        >
          Admin Login
        </motion.h1>
        
        <form onSubmit={handleSubmit}>
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-6"
          >
            <label className="block text-sm font-semibold mb-3 text-gray-200">Password</label>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-4 border border-white/30 bg-white/10 backdrop-blur-sm rounded-xl focus:ring-2 focus:ring-white focus:border-transparent text-white placeholder-gray-400 transition-all"
              placeholder="Enter admin password"
              required
            />
          </motion.div>

          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.9 }}
                className="mb-6 p-4 bg-red-500/20 border border-red-500/50 text-red-200 rounded-xl backdrop-blur-sm"
              >
                <motion.span
                  animate={{ x: [0, -5, 5, -5, 5, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  {error}
                </motion.span>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-white to-gray-100 text-gray-900 py-4 rounded-xl font-bold hover:shadow-2xl hover:shadow-white/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {loading ? (
              <motion.span 
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="flex items-center justify-center gap-3"
              >
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="inline-block w-5 h-5 border-3 border-gray-900 border-t-transparent rounded-full"
                />
                Logging in...
              </motion.span>
            ) : 'Login'}
          </motion.button>
        </form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 text-center text-gray-300 text-sm"
        >
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Secure Admin Access
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  );
}
