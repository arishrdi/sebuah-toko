import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

const Navbar = () => {
  const { data: sessionData } = useSession();
  return (
    <>
      <div>Navbar</div>
      <p>{sessionData?.user.name}</p>
      {sessionData ? <button onClick={() => void signOut()}>LogOut</button>: <button onClick={() => void signIn()}>LogIn</button>}
    </>
  );
};

export default Navbar;
