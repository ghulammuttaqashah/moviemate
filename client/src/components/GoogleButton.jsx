import { FcGoogle } from "react-icons/fc";

function GoogleButton({ text = "Continue with Google", onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-center gap-2 
                 border border-gray-700 rounded-xl py-2 
                 bg-gray-900 text-white 
                 hover:bg-gray-100 hover:text-gray-900 
                 transition font-bold"
    >
      <FcGoogle size={20} />
      <span>{text}</span>
    </button>
  );
}

export default GoogleButton;