import { Info } from "lucide-react";
import { createContext, useContext, useState, ReactNode } from "react";

interface Toast {
  id: number;
  message: string;
}

interface ToastContextType {
  showToast: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string) => {
    const id = Date.now();
    setToasts((prevToasts) => [...prevToasts, { id, message }]);
    setTimeout(() => removeToast(id), 3000); // Show for 3 seconds
  };

  const removeToast = (id: number) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="flex flex-col items-start gap-1 px-4 py-3 rounded-xl bg-gradient-to-br from-stone-800/80 to-stone-900/80 border border-stone-700/40 text-stone-200 shadow-lg backdrop-blur-md text-sm font-semibold"
          >
            <div className="flex items-center gap-2">
              <Info size={16} className="text-amber-500 mt-0.5" />
              <span>{toast.message}</span>
            </div>
            {/* <span className="text-xs text-stone-400 font-normal px-6">
              Success.
            </span> */}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context.showToast;
};
