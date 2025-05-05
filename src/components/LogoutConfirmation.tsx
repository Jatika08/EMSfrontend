import { UserContext } from "../contexts/UserContextProvider";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export const LogoutConfirmation = ({ onClose }: { onClose: () => void }) => {
  const { logout } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h2 className="text-lg font-semibold">
        Are you sure you want to logout?
      </h2>
      <div className="flex space-x-4 mt-4">
        <button
          className="px-4 py-2 bg-red-500 text-white rounded"
          onClick={() => {
            logout();
            onClose();
            navigate("/auth", { replace: true });
          }}
        >
          Logout
        </button>
        <button
          className="px-4 py-2 bg-gray-300 text-black rounded"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
