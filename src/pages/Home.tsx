import DashboardHeader from "../components/DashboardHeader";
import PendingApprovals from "../components/PendingApprovals";
import LeavesCalender from "../components/LeavesCalender";
import Contacts from "../components/Contacts";
import ActionsModal from "../components/ActionsModal";
import { useState } from "react";
import { MyTeam } from "../components/MyTeam";
import { Notices } from "../components/Notices";

function Home() {
  const today = new Date();
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);

  return (
    <div className="min-h-screen flex flex-col md:flex-row pt-4 justify-center bg-stone-950 px-10 pl-20 gap-4">
      <div className="flex flex-col w-full gap-4">
        <DashboardHeader
          userName="Utkarsh"
          setModalOpen={setModalOpen}
          setModalType={setModalType}
        />

        <PendingApprovals
          approvals={[
            {
              name: "Aditi Sharma",
              designation: "UI Designer",
              type: "WFH",
              from: "2025-04-12",
              to: "2025-04-14",
            },
            {
              name: "Rohan Verma",
              designation: "Backend Developer",
              type: "Leave",
              from: "2025-04-15",
              to: "2025-04-17",
            },
            {
              name: "Rohan Verma",
              designation: "Backend Developer",
              type: "Leave",
              from: "2025-04-15",
              to: "2025-04-17",
            },
          ]}
        />
        <Notices setModalOpen={setModalOpen} setModalType={setModalType} />

        <Contacts />
      </div>
      <div className="flex flex-col w-full gap-4">
        <LeavesCalender month={today.getMonth()} year={today.getFullYear()} />
        <MyTeam />
      </div>
      <ActionsModal
        isOpen={isModalOpen}
        modalType={modalType}
        onClose={() => setModalOpen(false)}
      ></ActionsModal>
    </div>
  );
}

export default Home;
