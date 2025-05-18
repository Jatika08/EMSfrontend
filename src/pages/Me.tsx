// src/pages/Me.tsx

import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance"; // Use your axios instance

type UserProfile = {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  image: string;
  joiningDate: string;
  address: string;
  linkedInId: string;
  githubId: string;
  dateOfBirth: string;
};

export const Me = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  useEffect(() => {
  const fetchProfile = async () => {
    try {
      const email = localStorage.getItem("email"); // Assuming email is saved on login

      if (!email) {
        console.error("No email found in localStorage");
        return;
      }

      const response = await axiosInstance.get(`/users/me?email=${email}`); 
      setProfile(response.data);
    } catch (error) {
      console.error("Failed to fetch profile", error);
    }
  };

  fetchProfile();
}, []);


  if (!profile) {
    return (
      <div className="flex justify-center items-center min-h-screen text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex pl-20 py-5">
      <div className="w-full max-w-7xl flex flex-col md:flex-row gap-5 text-stone-200">
        {/* Left Profile Card */}
        <div className="bg-stone-800 h-128 border border-stone-700/30 rounded-4xl p-8 flex flex-col items-center gap-6 shadow-[inset_0_0_30px_rgba(0,0,0,0.4)] md:w-1/3">
          <div className="w-36 h-36 rounded-full bg-stone-700 overflow-hidden border-4 border-stone-600">
            <img
              src={profile.image || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-bold">{profile.name}</h1>
            <p className="text-stone-400 text-lg mt-2">{profile.position}</p>
            <p className="text-stone-500 text-sm mt-1">ID: {profile.id}</p>
            <p className="text-stone-500 text-sm">Dept: {profile.department}</p>
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

        {/* Right Expandable Sections */}
        <div className="flex flex-col gap-6 md:w-2/3">
          {[
            {
              title: "Contact Information",
              content: `Email: ${profile.email}\nPhone: ${profile.phone || "N/A"}\nAddress: ${profile.address || "N/A"}`,
            },
            {
              title: "Employment Details",
              content: `Joining Date: ${profile.joiningDate || "N/A"}\nDepartment: ${profile.department}\nPosition: ${profile.position}`,
            },
            {
              title: "Social Profiles",
              content: `LinkedIn: ${profile.linkedInId || "N/A"}\nGitHub: ${profile.githubId || "N/A"}`,
            },
            {
              title: "Personal Details",
              content: `Date of Birth: ${profile.dateOfBirth || "N/A"}`,
            },
          ].map(({ title, content }) => (
            <div
              key={title}
              className="bg-stone-800 border border-stone-700/30 rounded-3xl p-6 shadow-[inset_0_0_30px_rgba(0,0,0,0.4)]"
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
