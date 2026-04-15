function SkeletonCard() {
  return (
    <div className="rounded-sm bg-white p-3 shadow-card">
      <div className="h-44 animate-pulse rounded bg-gray-100" />
      <div className="mt-3 h-4 w-11/12 animate-pulse rounded bg-gray-100" />
      <div className="mt-2 h-4 w-3/4 animate-pulse rounded bg-gray-100" />
      <div className="mt-3 h-5 w-1/2 animate-pulse rounded bg-gray-100" />
    </div>
  );
}

export default SkeletonCard;
