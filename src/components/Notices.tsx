import { useContext, useState } from "react";
import { ChevronDown, ChevronUp, Plus, Trash2 } from "lucide-react";
import { UserContext } from "../contexts/UserContextProvider";
import axiosInstance from "../utils/axiosInstance";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { UserActions } from "../utils/enums";
import { useToast } from "../contexts/CustomToast";

export const Notices = ({
  setModalOpen,
  setModalType,
}: {
  setModalOpen: (open: boolean) => void;
  setModalType: React.Dispatch<React.SetStateAction<UserActions>>;
}) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const { isSuperUser } = useContext(UserContext);
  const queryClient = useQueryClient();
  const showToast = useToast();

  const fetchNotices = async () => {
    const response = await axiosInstance.get("/notices");
    return response.data;
  };

  const {
    data: notices,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["notices"],
    queryFn: fetchNotices,
  });

  const toggleNotice = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleDelete = async (notice_id: number) => {
    try {
      await axiosInstance.delete(`/notices/${notice_id}`);
      showToast("Notice deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["notices"] });
    } catch (err) {
      showToast("Failed to delete notice");
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="bg-gradient-to-br from-stone-800/80 to-stone-900/80 rounded-3xl p-6 border border-stone-700/30 shadow-[inset_0_0_12px_rgba(0,0,0,0.4)] backdrop-blur-lg text-stone-200 h-80">
      <div className="flex flex-row justify-between">
        <h2 className="text-2xl mb-5 font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-stone-400 tracking-wide">
          Leave Notices
        </h2>
        {isSuperUser && (
          <button
            className="p-1 hover:text-white text-stone-400 transition-colors bg-stone-800 rounded-md hover:bg-stone-600 w-8 h-8 flex items-center justify-center"
            onClick={() => {
              setModalOpen(true);
              setModalType(UserActions.POST_NOTICE);
            }}
          >
            <Plus size={18} />
          </button>
        )}
      </div>

      <div className="flex flex-col gap-2 h-55 overflow-y-scroll scroll-smooth">
        {isLoading ? (
          <p className="text-stone-400 text-sm">Loading notices...</p>
        ) : isError ? (
          <p className="text-red-400 text-sm">Error fetching notices.</p>
        ) : !notices?.length ? (
          <p className="text-stone-400 text-sm">No notices yet.</p>
        ) : (
          notices.map((notice: any, idx: number) => {
            const isExpanded = expandedIndex === idx;
            return (
              <div
                key={notice.notice_id || idx}
                className={`bg-stone-800/70 rounded-xl p-2 px-4 hover:bg-stone-700/70 hover:shadow-md transition-all duration-300 ease-in-out ${
                  isExpanded ? "h-50" : "h-40"
                }
                `}
              >
                <div
                  className="flex items-center justify-between cursor-pointer "
                  onClick={() => toggleNotice(idx)}
                >
                  <div>
                    <p className="text-md font-semibold">
                      {notice.notice_title}
                    </p>
                    <p className="text-xs text-stone-400">
                      {new Date(notice.notice_time).toLocaleDateString(
                        "en-IN",
                        {
                          year: "numeric",
                          month: "short",
                          day: "2-digit",
                        }
                      )}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {isSuperUser && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(notice.notice_id);
                        }}
                        className="text-stone-400 hover:text-red-600"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                    {isExpanded ? (
                      <ChevronUp size={18} className="text-stone-400" />
                    ) : (
                      <ChevronDown size={18} className="text-stone-400" />
                    )}
                  </div>
                </div>

                {isExpanded && (
                  <div className="text-sm text-stone-300 mt-3 animate-fade-in">
                    {notice.notice_text}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
