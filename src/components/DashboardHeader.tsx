import { useAuth } from '@/contexts/useAuth';
import { ProfileMenu } from './ProfileMenu';
import clsx from 'clsx';

export const DashboardHeader = ({ transparent = false }) => {
  const { user } = useAuth();

  return (
    <header
      className={clsx(
        'fixed top-4 left-1/2 -translate-x-1/2 z-50 rounded-full border backdrop-blur-xl transition-all duration-500 shadow-lg shadow-black/20',
        'bg-gray-900/50 text-gray-200 border-gray-700/60', 
        'sm:bg-gray-200/40 sm:text-gray-900 sm:border-gray-300/60', 
      )}
      style={{
        width: '90%',
        maxWidth: '700px',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
      }}
    >
      <div className="flex items-center justify-between px-4 sm:px-6 py-3">
        <div className="flex items-center gap-2">
        <h1
          className={clsx(
            'text-lg sm:text-2xl font-extrabold transition-colors duration-300',
            'text-gray-200 sm:text-gray-900'
          )}
        >
          CallFlow
        </h1>
          <p
            className={clsx(
              'text-sm font-semibold opacity-90 transition-colors duration-300',
              'text-gray-200 sm:text-gray-900'
            )}
          >
            by Xcentic
          </p>
        </div>
        <ProfileMenu user={user} />
      </div>
    </header>
  );
};
