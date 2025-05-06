const teamMembers = [
  { name: "Phil", isPresent: true },
  { name: "Jemma", isPresent: false },
  { name: "Enoch", isPresent: true },
  { name: "Ward", isPresent: true },
  { name: "Rina", isPresent: true },
  { name: "Evan Wright", isPresent: true },
  { name: "Fiona Lee", isPresent: false },
  { name: "George Kim", isPresent: true },
];

export const MyTeam = () => {
  return (
    <div className="bg-gradient-to-br from-stone-800/80 to-stone-900/80 rounded-3xl p-6 border border-stone-700/30 shadow-[inset_0_0_12px_rgba(0,0,0,0.4)] backdrop-blur-lg text-stone-200 ">
      <h2 className="text-2xl font-bold  bg-clip-text text-transparent bg-gradient-to-r from-white to-stone-400 tracking-wide">
        My Team
      </h2>
      <p className="text-stone-400 text-sm mt-1 mb-6">
        You are currently in maintainence team.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3">
        {teamMembers.map((member, idx) => (
          <div
            key={idx}
            className="flex flex-row gap-2 items-center p-2 px-4 bg-stone-800/70  rounded-xl hover:bg-stone-700/70 hover:shadow-md transition-all duration-300 ease-in-out"
          >
            <div className="relative mb-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold bg-gradient-to-br from-stone-700 to-stone-900 text-white border-2 border-stone-600 shadow-inner">
                {member.name
                  .split(" ")
                  .map((word) => word[0])
                  .join("")
                  .toUpperCase()}
              </div>

              {/* Status Dot */}
              <span
                className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-stone-900 ${
                  member.isPresent ? "bg-stone-200" : "bg-stone-500"
                }`}
              ></span>
            </div>

            <div className="pl-1">
              <p className="text-sm font-semibold">{member.name}</p>
              <p className="text-xs text-stone-400 mt-0.5">
                {member.isPresent ? "Present" : "Absent"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
