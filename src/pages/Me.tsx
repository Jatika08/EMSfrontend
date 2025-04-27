import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export const Me = () => {
  // State to control dropdowns
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  return (
    <div className="min-h-screen flex  pl-20 py-5">
      <div className="w-full max-w-7xl flex flex-col md:flex-row gap-5 text-stone-200">
        {/* Left Profile Info */}
        <div className="bg-stone-800 h-128 border border-stone-700/30 rounded-4xl p-8 flex flex-col items-center gap-6 shadow-[inset_0_0_30px_rgba(0,0,0,0.4)] md:w-1/3">
          <div className="w-36 h-36 rounded-full bg-stone-700 overflow-hidden border-4 border-stone-600">
            <img
              src="https://via.placeholder.com/150"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-bold">John Doe</h1>
            <p className="text-stone-400 text-lg mt-2">
              Senior Software Engineer
            </p>
            <p className="text-stone-500 text-sm mt-1">ID: 123456</p>
            <p className="text-stone-500 text-sm">Dept: Technology</p>
          </div>
          <div className="flex gap-4 mt-6">
            <button className="bg-stone-600 hover:bg-stone-500 transition px-4 py-2 rounded-full text-sm">
              Edit
            </button>
            <button className="bg-stone-600 hover:bg-stone-500 transition px-4 py-2 rounded-full text-sm">
              Resume
            </button>
          </div>
        </div>

        {/* Right Details */}
        <div className="flex flex-col gap-6 md:w-2/3">
          {[
            {
              title: "Contact",
              content:
                "Email: john.doe@example.com\nPhone: +1 234 567 8900\nLocation: San Francisco, CA\nManager: Jane Smith",
            },
            {
              title: "Employment Details",
              content:
                "Hire Date: Jan 15, 2019\nExperience: 5 Years\nPromotion: March 2022\nCurrent Project: Cloud Migration Platform",
            },
          ].map(({ title, content }) => (
            <div
              key={title}
              className="bg-stone-800 border border-stone-700/30 rounded-3xl  p-6 shadow-[inset_0_0_30px_rgba(0,0,0,0.4)]"
            >
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleSection(title)}
              >
                <h2 className="text-2xl font-semibold">{title}</h2>
                <span className="text-stone-400 text-xl">
                  {openSection === title ? <ChevronUp /> : <ChevronDown />}
                </span>
              </div>

              {/* Dropdown content */}
              {openSection === title && (
                <div className="mt-4 whitespace-pre-line text-stone-300 leading-relaxed">
                  {content}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
