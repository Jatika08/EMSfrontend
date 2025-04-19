import { useState } from "react";

interface Employee {
  name: string;
  role: string;
  email: string;
}

export const LanyardGenerator = ({
  selectedEmployee,
}: {
  selectedEmployee: Employee;
}) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  interface MouseMoveEvent
    extends React.MouseEvent<HTMLDivElement, MouseEvent> {
    currentTarget: HTMLDivElement;
  }

  const handleMouseMove = (e: MouseMoveEvent) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const cardX = rect.left + rect.width / 2;
    const cardY = rect.top + rect.height / 2;

    const deltaX = e.clientX - cardX;
    const deltaY = e.clientY - cardY;

    const rotateX = parseFloat((-deltaY / 15).toFixed(2));
    const rotateY = parseFloat((deltaX / 15).toFixed(2));

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div className="perspective-[600px]">
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="transition-transform duration-200 ease-out"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        }}
      >
        <div className="w-72 h-110 font-ubuntu aspect-[3/4] bg-gradient-to-br from-stone-950/80 to-stone-900/100 border border-stone-400/20 shadow-2xl rounded-2xl p-4 flex flex-col items-center justify-start gap-2 text-stone-200 backdrop-blur-md overflow-hidden">
          {/* Slot holes */}
          <div className="w-full flex justify-center relative mt-2 mb-2">
            <div className="w-20 h-4 bg-stone-800/30 rounded-full shadow-inner z-10 border border-stone-400/20" />
          </div>

          <div className="bg-gradient-to-br from-black/100 to-black/20 h-full w-full rounded-2xl shadow-inner px-3 py-6 flex flex-col gap-4">
            {/* Top Section: Name & Title */}
            <div>
              <h2 className="text-white text-3xl font-extrabold tracking-wide leading-snug drop-shadow font-header">
                {selectedEmployee.name}
              </h2>
              <p className="text-stone-400 text-2xl mt-1 tracking-wider italic font-signature">
                {selectedEmployee.role}
              </p>
            </div>

            {/* Details Section */}
            <div className="text-[11px] text-stone-300 space-y-1 bg-stone-900/5 rounded-xl backdrop-blur-md mt-auto  py-2 shadow-inner font-header">
              <p className="tracking-wider">SHLD-042</p>
              <p className="tracking-wide">Operations Division</p>
              <p className="tracking-wider">LEVEL 7</p>
              <p className="truncate">{selectedEmployee.email}</p>
            </div>

            {/* Optional Image/Logo */}
            <img
              src="/path1.svg"
              alt="badge deco"
              className="w-16 opacity-80"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
