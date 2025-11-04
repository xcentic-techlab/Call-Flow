import { useAuth } from '@/contexts/useAuth';
import { ProfileMenu } from './ProfileMenu';
import clsx from 'clsx';

export const DashboardHeader = ({ transparent = false }) => {
  const { user } = useAuth();

  return (
    <header
      className={clsx(
        'fixed top-4 left-1/2 -translate-x-1/2 z-50 rounded-full shadow-lg backdrop-blur-md transition-all duration-300',
        transparent
          ? 'bg-white/10 border border-white/20 text-white'
          : 'bg-gray-800/90 border border-gray-700 text-white'
      )}
      style={{
        width: '90%',
        maxWidth: '700px',
      }}
    >
      <div className="flex items-center justify-between px-4 sm:px-6 py-3">
        <div className="flex items-center gap-2">
          <h1
            className={clsx(
              'text-lg sm:text-2xl font-extrabold bg-clip-text text-transparent',
              'bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 sm:from-white sm:via-gray-200 sm:to-white'
            )}
          >
            CallFlow
          </h1>
          <p
            className={clsx(
              'text-sm font-semibold opacity-80',
              'text-gray-900 sm:text-gray-300'
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
