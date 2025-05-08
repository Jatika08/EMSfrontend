import { X } from "lucide-react";
import { useEffect, useState } from "react";

const releaseNotesDummyData = [
  {
    title: "v0.1.0 - Initial Setup",
    date: "2024-12-15",
    Details: [
      {
        feat: "Project Initialization",
        details: "Set up project with Next.js, Tailwind CSS, and TypeScript.",
      },
      {
        feat: "CI/CD",
        details:
          "Configured basic CI/CD pipeline with GitHub Actions and Vercel deployment.",
      },
    ],
  },
  {
    title: "v0.2.0 - Authentication & User Roles",
    date: "2025-01-10",
    Details: [
      {
        feat: "Login System",
        details:
          "Implemented email/password login with JWT token-based authentication.",
      },
      {
        feat: "Role Management",
        details: "Added admin and employee roles with basic access control.",
      },
    ],
  },
  {
    title: "v0.3.0 - Leave Application Core",
    date: "2025-02-05",
    Details: [
      {
        feat: "Leave Types",
        details: "Configured casual, sick, and earned leaves.",
      },
      {
        feat: "Leave Request Flow",
        details:
          "Employees can now apply for leave with reason and date range.",
      },
    ],
  },
  {
    title: "v0.4.0 - Admin Dashboard & Approvals",
    date: "2025-03-01",
    Details: [
      {
        feat: "Admin Dashboard",
        details: "Admins can view, approve, or reject leave requests.",
      },
      {
        feat: "Leave Status Tracking",
        details: "Employees can see approval status of their leave requests.",
      },
    ],
  },
  {
    title: "v0.5.0 - User Profile & Notifications",
    date: "2025-04-10",
    Details: [
      {
        feat: "Profile Page",
        details: "Users can view and update personal info.",
      },
      {
        feat: "Notifications",
        details: "Leave approval/rejection notifications via in-app alerts.",
      },
    ],
  },
];

const WelcomeModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [isWindowVisible, setIsWindowVisible] = useState(true);

  useEffect(() => {
    const animationDuration = 0;
    const timer = setTimeout(() => setIsWindowVisible(true), animationDuration);
    return () => clearTimeout(timer);
  }, []);

  if (!isModalVisible) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex flex-col justify-center items-center bg-black/15">
        <div className="flex justify-center items-center h-screen">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 220 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="strokeGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#FB923C" />
                <stop offset="100%" stopColor="#F97316" />
              </linearGradient>
            </defs>
            <path
              d="M -0.18744107,102.46058 C 12.90325,84.549494 25.116337,66.08883 37.322542,47.63025 41.540985,41.251063 45.356428,34.631719 49.73783,28.35201 49.7716,28.30395 66.935541,3.5657002 69.285313,3.5657002 c 2.326334,0 -1.933141,4.0738481 -3.433971,5.7584351 C 59.975922,15.918669 54.281489,21.779993 49.73783,29.353476 36.681731,51.115748 28.503106,72.935037 19.624168,96.201405 c -1.379922,3.61585 -6.339705,8.996655 -6.339705,12.768705 0,0.53438 0.619025,-0.91486 1.056618,-1.25183 6.739839,-5.1903 -0.574623,1.42886 9.509557,-7.761385 4.80243,-4.376668 9.60983,-8.751529 14.264399,-13.269428 3.632099,-3.525491 47.019606,-66.719912 47.019606,-68.600498 0,-0.03585 -9.731128,13.025881 -18.226681,25.287045 -14.936813,21.557394 -23.444157,44.754793 -28.792925,70.102696 -0.177801,0.84255 1.557151,-0.88597 2.377357,-1.25182 7.248654,-3.23308 12.906711,-9.47892 18.49087,-14.771655 22.597007,-21.417451 37.322944,-42.600601 53.623496,-68.350128 5.78898,-9.144639 12.76828,-16.732475 12.15117,-17.024936 -4.37567,-2.073619 -16.44721,13.231381 -17.96257,15.272372 -20.708958,27.89238 -28.384306,51.407431 -37.510047,83.121767 -1.848153,6.4229 -5.323917,10.18428 2.905738,4.25623 8.990997,-6.47649 16.920975,-13.91949 24.830578,-21.531535 8.866311,-8.532823 16.126621,-17.458754 22.981521,-27.540351 11.43664,-16.820223 14.62184,-33.780083 23.50977,-47.820049 3.88035,-6.129641 -6.31429,9.873167 -13.47192,19.27824 -14.35543,18.863024 -29.61522,38.211954 -40.151578,59.33692 -0.247619,0.49647 -5.247856,15.773125 -4.754779,15.773125 15.009947,0 55.234277,-54.686198 62.076427,-65.846476 5.02228,-8.191852 9.43585,-16.779913 14.79271,-24.786307 0.90583,-1.353858 3.58012,-5.310766 3.16985,-3.755502 -8.03822,30.474471 -35.15773,54.901947 -49.92532,82.621035 -1.26354,2.37166 -14.09897,36.27046 -10.03787,17.02494"
              stroke="url(#strokeGradient)"
              strokeWidth="20"
              fill="none"
              className="animate-draw"
            />
          </svg>
        </div>

        {isWindowVisible && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-xl">
            <div className="relative bg-gradient-to-br from-stone-800/80 to-stone-900/80 rounded-3xl p-6 border border-stone-700/30 shadow-[inset_0_0_15px_rgba(0,0,0,0.5)] backdrop-blur-lg text-stone-300 w-full max-w-4xl mx-auto">
              {/* Close button */}
              <div
                className="absolute top-4 right-4 cursor-pointer hover:text-red-400"
                onClick={() => {
                  setIsModalVisible(false);
                  setIsWindowVisible(false);
                }}
              >
                <X />
              </div>

              {/* Modal content */}
              <div className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-white to-stone-300 mb-1">
                Welcome to Leave Sync
              </div>
              <div className="text-sm text-stone-400 mb-4">Release notes:</div>

              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-stone-600 scrollbar-track-stone-800/40">
                {releaseNotesDummyData
                  .slice()
                  .reverse()
                  .map((note, index) => (
                    <div
                      key={index}
                      className="bg-stone-700/40 p-4 rounded-xl border border-stone-700/30 shadow-inner"
                    >
                      <h3 className="text-lg font-medium text-white">
                        {note.title}
                      </h3>
                      <p className="text-xs text-stone-400 mb-2">{note.date}</p>
                      <ul className="list-disc list-inside space-y-1 text-sm text-stone-200">
                        {note.Details.map((detail, detailIndex) => (
                          <li key={detailIndex}>
                            <strong>{detail.feat}:</strong> {detail.details}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default WelcomeModal;
