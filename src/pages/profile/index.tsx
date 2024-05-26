import { useSession } from 'next-auth/react'
import React from 'react'

const ProfilePage = () => {
  const {data}: any = useSession() 
  return (
    <div className="flex items-start p-10 w-full">
      <div className="border-2 border-gray-400 p-4 flex items-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="rounded-full bg-gray-400 p-7"/>
          <div className="flex flex-col space-y-1">
            <h1>{data && data.user.fullname}</h1>
            <h1>{data && data.user.email}</h1>
            <h1>{data && data.user.nisn}</h1>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage