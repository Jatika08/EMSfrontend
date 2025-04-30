import { useContext, useState } from "react";
import { ChevronDown, ChevronUp, Plus } from "lucide-react";
import { UserContext } from "../contexts/UserContextProvider";

const notices = [
  {
    header: "System Maintenance",
    date: "April 29, 2025",
    text: "The backend systems will be under maintenance from 2 AM to 4 AM. Please plan your tasks accordingly.",
  },
  {
    header: "New Leave Policy",
    date: "April 24, 2025",
    text: "A new leave policy has been introduced. Kindly check the HR portal for detailed information.",
  },
  {
    header: "Fire Drill",
    date: "April 22, 2025",
    text: "There will be a mandatory fire drill this Friday at 3 PM. Participation is compulsory for all staff.",
  },
  {
    header: "Office Renovation",
    date: "April 20, 2025",
    text: "Renovation work will be ongoing on the 2nd floor. Expect temporary relocation of team spaces.",
  },
];

export const Notices = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const { isSuperUser } = useContext(UserContext);

  const toggleNotice = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="bg-gradient-to-br from-stone-800/80 to-stone-900/80 rounded-3xl p-6 border border-stone-700/30 shadow-[inset_0_0_12px_rgba(0,0,0,0.4)] backdrop-blur-lg text-stone-200  max-h-[420px] ">
      <div className=" flex flex-row justify-between ">
        <h2 className="text-2xl mb-5 font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-stone-400 tracking-wide">
          Leave Notices
        </h2>
        {isSuperUser && (
          <button
            className="p-1  hover:text-white text-stone-400 transition-colors bg-stone-800 rounded-md hover:bg-stone-600 w-8 h-8 flex items-center justify-center"
            onClick={() => {}}
          >
            <Plus size={18} />
          </button>
        )}
      </div>

      <div className="flex flex-col gap-4 h-80 overflow-y-auto scroll-smooth">
        {notices.map((notice, idx) => (
          <div
            key={idx}
            className="bg-stone-800/70 rounded-xl p-2 px-4 border border-stone-700/40 transition-all duration-300 ease-in-out hover:shadow-[0_0_10px_rgba(255,255,255,0.05)]"
          >
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleNotice(idx)}
            >
              <div>
                <p className="text-md font-semibold">{notice.header}</p>
                <p className="text-xs text-stone-400">{notice.date}</p>
              </div>
              <div className="text-stone-400">
                {expandedIndex === idx ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
              </div>
            </div>

            <div
              className={`text-sm text-stone-300 mt-3 overflow-hidden transition-all duration-300 ease-in-out ${
                expandedIndex === idx
                  ? "max-h-40 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              {notice.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
