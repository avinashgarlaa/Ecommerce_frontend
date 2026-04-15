function SkeletonCard() {
  return (
    <div className="sv-panel p-3">
      <div className="aspect-[4/3] animate-pulse rounded-xl bg-slate-100" />
      <div className="mt-3 h-4 w-11/12 animate-pulse rounded bg-slate-100" />
      <div className="mt-2 h-4 w-3/4 animate-pulse rounded bg-slate-100" />
      <div className="mt-3 h-5 w-1/2 animate-pulse rounded bg-slate-100" />
    </div>
  );
}

export default SkeletonCard;
