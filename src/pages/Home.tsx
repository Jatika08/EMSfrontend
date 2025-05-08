import DashboardHeader from "../components/DashboardHeader";
import PendingApprovals from "../components/PendingApprovals";
import Contacts from "../components/Contacts";
import ActionsModal from "../components/ActionsModal";
import { useContext, useState } from "react";
import { MyTeam } from "../components/MyTeam";
import { Notices } from "../components/Notices";
import { LeavesCalenderHolder } from "../components/LeavesCalenderHolder";
import WelcomeModal from "../components/WelcomeModal";
import { UserContext } from "../contexts/UserContextProvider";

function Home() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const { isSuperUser } = useContext(UserContext);

  return (
    <div className="min-h-screen flex flex-col md:flex-row pt-4 justify-center bg-stone-950 px-10 pl-20 gap-4">
      <WelcomeModal />
      <div className="flex flex-col w-full gap-4">
        <DashboardHeader
          userName="Utkarsh"
          setModalOpen={setModalOpen}
          setModalType={setModalType}
        />

        {isSuperUser && <PendingApprovals />}
        <Notices setModalOpen={setModalOpen} setModalType={setModalType} />

        <Contacts />
      </div>
      <div className="flex flex-col w-full gap-4">
        <LeavesCalenderHolder />
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
