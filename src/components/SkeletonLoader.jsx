const SkeletonCard = () => (
  <div className="p-6 rounded-2xl bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 space-y-4 animate-pulse">
    <div className="h-4 w-20 bg-surface-200 dark:bg-surface-700 rounded-lg" />
    <div className="h-8 w-32 bg-surface-200 dark:bg-surface-700 rounded-lg" />
    <div className="h-3 w-24 bg-surface-200 dark:bg-surface-700 rounded-lg" />
  </div>
);

const SkeletonTable = ({ count = 5 }) => (
  <div className="space-y-3">
    <div className="h-10 w-full rounded-xl bg-surface-200 dark:bg-surface-700 animate-pulse" />
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="h-14 w-full rounded-xl bg-surface-100 dark:bg-surface-800 animate-pulse" />
    ))}
  </div>
);

const SkeletonQuestion = () => (
  <div className="space-y-6 animate-pulse">
    <div className="flex items-center justify-between">
      <div className="space-y-2">
        <div className="h-4 w-32 bg-surface-200 dark:bg-surface-700 rounded-lg" />
        <div className="h-3 w-24 bg-surface-200 dark:bg-surface-700 rounded-lg" />
      </div>
      <div className="h-8 w-20 bg-surface-200 dark:bg-surface-700 rounded-lg" />
    </div>
    <div className="h-3 w-full bg-surface-200 dark:bg-surface-700 rounded-lg" />
    <div className="h-48 w-full rounded-2xl bg-gradient-to-r from-surface-100 via-surface-200 to-surface-100 dark:from-surface-800 dark:via-surface-700 dark:to-surface-800 animate-shimmer" />
    <div className="h-40 w-full rounded-2xl bg-surface-100 dark:bg-surface-800" />
    <div className="flex justify-between">
      <div className="h-10 w-24 bg-surface-200 dark:bg-surface-700 rounded-xl" />
      <div className="flex gap-2">
        <div className="h-10 w-20 bg-surface-200 dark:bg-surface-700 rounded-xl" />
        <div className="h-10 w-24 bg-primary-200 dark:bg-primary-900/30 rounded-xl" />
      </div>
    </div>
  </div>
);

const SkeletonResult = () => (
  <div className="space-y-6 animate-pulse">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 p-6 rounded-2xl bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col items-center justify-center p-6 bg-surface-50 dark:bg-surface-800 rounded-xl">
            <div className="w-32 h-32 rounded-full bg-surface-200 dark:bg-surface-700" />
            <div className="mt-4 space-y-2 text-center">
              <div className="h-5 w-40 bg-surface-200 dark:bg-surface-700 rounded-lg mx-auto" />
              <div className="h-4 w-24 bg-surface-200 dark:bg-surface-700 rounded-lg mx-auto" />
            </div>
          </div>
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-1">
                <div className="h-4 w-32 bg-surface-200 dark:bg-surface-700 rounded-lg" />
                <div className="h-3 w-full bg-surface-200 dark:bg-surface-700 rounded-lg" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="space-y-4">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="p-6 rounded-2xl bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 space-y-3">
            <div className="h-5 w-24 bg-surface-200 dark:bg-surface-700 rounded-lg" />
            {Array.from({ length: 3 }).map((_, j) => (
              <div key={j} className="h-4 w-full bg-surface-200 dark:bg-surface-700 rounded-lg" />
            ))}
          </div>
        ))}
      </div>
    </div>
    <div className="p-6 rounded-2xl bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 space-y-4">
      <div className="h-5 w-40 bg-surface-200 dark:bg-surface-700 rounded-lg" />
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="h-16 w-full rounded-xl bg-surface-100 dark:bg-surface-800" />
      ))}
    </div>
  </div>
);

const SkeletonDashboard = () => (
  <div className="space-y-6 animate-pulse">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="p-6 rounded-2xl bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 space-y-3">
          <div className="h-4 w-24 bg-surface-200 dark:bg-surface-700 rounded-lg" />
          <div className="h-8 w-16 bg-surface-200 dark:bg-surface-700 rounded-lg" />
          <div className="h-3 w-32 bg-surface-200 dark:bg-surface-700 rounded-lg" />
        </div>
      ))}
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="p-6 rounded-2xl bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700">
        <div className="h-5 w-40 bg-surface-200 dark:bg-surface-700 rounded-lg mb-4" />
        <div className="h-64 bg-surface-100 dark:bg-surface-800 rounded-xl" />
      </div>
      <div className="p-6 rounded-2xl bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700">
        <div className="h-5 w-40 bg-surface-200 dark:bg-surface-700 rounded-lg mb-4" />
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-16 w-full bg-surface-100 dark:bg-surface-800 rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  </div>
);

export const SkeletonLoader = ({ type = 'card', count = 1 }) => {
  switch (type) {
    case 'card':
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: count }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      );
    case 'table':
      return <SkeletonTable count={count} />;
    case 'question':
      return <SkeletonQuestion />;
    case 'result':
      return <SkeletonResult />;
    case 'dashboard':
      return <SkeletonDashboard />;
    case 'profile':
      return (
        <div className="space-y-6 animate-pulse">
          <div className="p-6 rounded-2xl bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 space-y-6">
            <div className="flex items-center gap-4">
              <div className="h-20 w-20 rounded-full bg-surface-200 dark:bg-surface-700" />
              <div className="space-y-2 flex-1">
                <div className="h-5 w-40 bg-surface-200 dark:bg-surface-700 rounded-lg" />
                <div className="h-4 w-60 bg-surface-200 dark:bg-surface-700 rounded-lg" />
              </div>
            </div>
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-12 w-full rounded-xl bg-surface-100 dark:bg-surface-800" />
              ))}
            </div>
          </div>
        </div>
      );
    case 'chart':
      return (
        <div className="p-6 rounded-2xl bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 space-y-4 animate-pulse">
          <div className="h-5 w-40 bg-surface-200 dark:bg-surface-700 rounded-lg" />
          <div className="h-64 w-full rounded-xl bg-surface-100 dark:bg-surface-800" />
        </div>
      );
    default:
      return (
        <div className="space-y-3 animate-pulse">
          {Array.from({ length: count }).map((_, i) => (
            <div key={i} className="h-4 bg-surface-200 dark:bg-surface-700 rounded" style={{ width: `${80 + Math.random() * 20}%` }} />
          ))}
        </div>
      );
  }
};

