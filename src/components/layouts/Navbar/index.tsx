import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

const Navbar = () => {
  const { data }: any = useSession();
  // console.log(data);
  
  return (
    <div
      className="py-3 px-5 bg-[#1c1c1c] text-white flex items-center space-x-4"
    >
      {data ? <button onClick={() => (data ? signOut() : signIn())} className="py-2 px-3 rounded-sm bg-white text-[#1c1c1c]">Logout</button>
        : <button onClick={() => (data ? signOut() : signIn())} className="py-2 px-3 rounded-sm bg-white text-[#1c1c1c]">Login</button>
      }
      <div className="text-gray-400 pl-3 border-white border-l-2">{data && data.user.fullname}</div>
      <div className="text-gray-400 pl-3 border-white border-l-2">{data && data.user.id}</div>
    </div>
  );
};

export default Navbar;
