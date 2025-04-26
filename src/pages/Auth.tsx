import { useState } from "react";
import { RegisterPage } from "../components/Register";
import { LoginPage } from "../components/Login";

export const AuthPage = () => {
  const [registering, setRegistering] = useState<boolean>(false);
  return (
    <>
      {registering ? (
        <RegisterPage setRegistering={setRegistering} />
      ) : (
        <LoginPage setRegistering={setRegistering} />
      )}
    </>
  );
};
