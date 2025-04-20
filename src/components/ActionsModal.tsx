// components/WindowModal.jsx

import { UserActions } from "../utils/enums";
import { DateRangeSelector } from "./DateRangeSelector";

interface ActionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  modalType: UserActions;
}

const ActionsModal = ({ isOpen, onClose, modalType }: ActionsModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 w-screen h-screen antialiased"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-[90%] max-w-6xl max-h-[90%] overflow-auto 
            bg-gradient-to-br from-stone-800/70 to-stone-900/70 
            border border-stone-700/30 
            rounded-3xl p-6 
            shadow-[inset_0_0_10px_rgba(0,0,0,0.4)] 
            backdrop-blur-lg 
            text-stone-200"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-stone-400 hover:text-red-400 text-2xl transition-colors"
        >
          ×
        </button>

        <ActionModalHeader modalType={modalType} />
      </div>
    </div>
  );
};

export default ActionsModal;

const actionHeadings: Record<UserActions, { title: string; subtitle: string }> =
  {
    [UserActions.APPLY_LEAVE]: {
      title: "Apply for Leave(s)",
      subtitle: "Fill in the form and click apply",
    },
    [UserActions.VIEW_LEABES]: {
      title: "Your Leave History",
      subtitle: "View your previous leave applications",
    },
    [UserActions.LEAVE_BALANCE]: {
      title: "Leave Balance",
      subtitle: "See how many leave days you have left",
    },
    [UserActions.VIEW_EMPLOYEE]: {
      title: "Employee Information",
      subtitle: "Browse or search employee records",
    },
  };

export const ActionModalHeader = ({ modalType }: { modalType: UserActions }) => {
  const content = actionHeadings[modalType];

  return (
    <div className="flex flex-col mb-4">
      <h2 className="text-2xl font-bold text-stone-200">{content.title}</h2>
      <i className="text-stone-400 text-sm">{content.subtitle}</i>
      {modalType == UserActions.APPLY_LEAVE && <DateRangeSelector />}
    </div>
  );
};
