import AdminViews from "@/components/views/admin";
import React from "react";

type userDataTypes = {
  id: number;
  nisn: number;
  nama: string;
  kasus: string;
};

const AdminPage = (props: {userdatas: userDataTypes[]}) => {
  const { userdatas } = props
  return (
    <div>
      <AdminViews userdatas={userdatas}/>
    </div>
  )
}

export default AdminPage;


export async function getServerSideProps() {
  const res = await fetch('http://localhost:3000/api/add/getusers')
  const response = await res.json()
  
  return {
      props: {
        userdatas: response.data
      },
  }
}