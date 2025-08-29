function Loader({ fullScreen = false }) {
  return (
    <div className={`${fullScreen ? "flex items-center justify-center min-h-screen" : "flex justify-center my-8"}`}>
      <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

export default Loader;