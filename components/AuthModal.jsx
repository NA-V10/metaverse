'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { supabase } from '../utils/supabase';
import styles from '../styles';
import { fadeIn } from '../utils/motion';

const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (error) throw error;
        toast.success('Successfully logged in!');
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        
        if (error) throw error;
        toast.success('Registration successful! Please check your email.');
      }
      
      onClose();
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      variants={fadeIn('down', 'tween', 0.2, 1)}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div className="bg-[#1A232E] p-8 rounded-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-white mb-6">
          {isLogin ? 'Login' : 'Register'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-white block mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 rounded bg-[#323F5D] text-white"
              required
            />
          </div>
          <div>
            <label className="text-white block mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 rounded bg-[#323F5D] text-white"
              required
            />
          </div>
          <button
            type="submit"
            className={`${styles.flexCenter} w-full py-3 px-6 rounded-[32px] gap-[12px] bg-[#25618B] text-white`}
          >
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>
        <p className="text-white text-center mt-4">
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-400 hover:underline"
          >
            {isLogin ? 'Register' : 'Login'}
          </button>
        </p>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-300"
        >
          ✕
        </button>
      </div>
    </motion.div>
  );
};

export default AuthModal;