import React from "react";

/**
 * Skeleton loader components for shimmer effects during content loading.
 * Use to reduce layout shift (CLS) and improve perceived performance.
 */

export const SkeletonText: React.FC<{ lines?: number; className?: string }> = ({
  lines = 1,
  className = "",
}) => (
  <div className={`space-y-2 ${className}`}>
    {Array.from({ length: lines }).map((_, i) => (
      <div
        key={i}
        className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"
      />
    ))}
  </div>
);

export const SkeletonCard: React.FC<{ className?: string }> = ({
  className = "",
}) => (
  <div
    className={`bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden ${className}`}
  >
    <div className="h-40 bg-gray-200 dark:bg-gray-700 animate-pulse" />
    <div className="p-4 space-y-3">
      <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse" />
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 animate-pulse" />
      <div className="flex gap-2 pt-2">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-20 animate-pulse" />
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-20 animate-pulse" />
      </div>
    </div>
  </div>
);

export const SkeletonAvatar: React.FC<{ className?: string }> = ({
  className = "",
}) => (
  <div
    className={`w-32 h-32 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse ${className}`}
  />
);

export const SkeletonSection: React.FC<{ className?: string }> = ({
  className = "",
}) => (
  <div className={`space-y-4 ${className}`}>
    <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 animate-pulse" />
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 3 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  </div>
);
