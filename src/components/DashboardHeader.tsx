import { useAuth } from '@/contexts/useAuth';
import { ProfileMenu } from './ProfileMenu';
import clsx from 'clsx';

export const DashboardHeader = ({ transparent = false }) => {
  const { user } = useAuth();

  return (
    <header
      className={clsx(
        'fixed top-4 left-1/2 -translate-x-1/2 z-50 rounded-full border backdrop-blur-2xl transition-all duration-500 ',
        'bg-white/10 border-white/20 shadow-white/10',
        'sm:bg-white/20 sm:border-white/30 sm:shadow-white/20'
      )}
      style={{
        width: '90%',
        maxWidth: '700px',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
    >
      <div className="flex items-center justify-between px-4 sm:px-6 py-3">
        <div className="flex items-center gap-2">
          <h1
            className={clsx(
              'text-lg sm:text-2xl font-extrabold transition-colors duration-300',
              'text-white'
            )}
          >
            CallFlow
          </h1>
          <p
            className={clsx(
              'text-sm font-semibold opacity-90 transition-colors duration-300',
              'text-white'
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
