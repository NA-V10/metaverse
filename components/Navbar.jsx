'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import styles from '../styles';
import { navVariants } from '../utils/motion';
import { supabase } from '../utils/supabase';
import AuthModal from './AuthModal';

const Navbar = () => {
  const [session, setSession] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error('Error logging out');
    }
  };

  return (
    <motion.nav
      variants={navVariants}
      initial="hidden"
      whileInView="show"
      className={`${styles.xPaddings} py-8 relative`}
    >
      <div className="absolute w-[50%] inset-0 gradient-01" />
      <div className={`${styles.innerWidth} mx-auto flex justify-between gap-8`}>
        <img
          src="/search.svg"
          alt="search"
          className="w-[24px] h-[24px] object-contain"
        />
        <h2 className="font-extrabold text-[24px] leading-[30px] text-white">
          METAVERSUS
        </h2>
        <div className="flex items-center gap-4">
          {session ? (
            <>
              <span className="text-white">
                {session.user.email}
              </span>
              <button
                onClick={handleLogout}
                className="text-white hover:text-gray-300"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => setShowAuthModal(true)}
              className="text-white hover:text-gray-300"
            >
              Login
            </button>
          )}
          <img
            src="/menu.svg"
            alt="menu"
            className="w-[24px] h-[24px] object-contain"
          />
        </div>
      </div>
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </motion.nav>
  );
};

export default Navbar;