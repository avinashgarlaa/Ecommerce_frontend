function Loader({ label = "Loading..." }) {
  return (
    <div className="sv-shell flex min-h-[40vh] items-center justify-center py-6">
      <div className="sv-panel flex items-center gap-3 px-5 py-4">
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-brandBlue border-t-transparent" />
        <span className="text-sm font-semibold text-slate-700">{label}</span>
      </div>
    </div>
  );
}

export default Loader;
