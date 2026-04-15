function Loader({ label = "Loading..." }) {
  return (
    <div className="flex min-h-[40vh] items-center justify-center">
      <div className="flex items-center gap-3 rounded bg-white px-4 py-3 shadow-card">
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-brandBlue border-t-transparent" />
        <span className="text-sm font-medium text-gray-700">{label}</span>
      </div>
    </div>
  );
}

export default Loader;
