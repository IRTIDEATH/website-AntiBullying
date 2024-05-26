import Link from "next/link";
import React, { FormEvent } from "react";

const MainViews = () => {
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        const form = event.target as HTMLFormElement;
        event.preventDefault();
        const data = {
          nisn: form.nisn.value,
          nama: form.nama.value,
          kasus: form.kasus.value,
        };
    
        const result = await fetch("/api/add/adduserdata", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
    
        if (result.status === 200) {
          form.reset();
        } else {
          console.log("error");
        }
      };
    
  return (
    <div className="p-4 w-full flex flex-col items-center">
        <form onSubmit={handleSubmit} className="w-[25%] space-y-5">
            <div className="flex flex-col">
                <label htmlFor="nisn">Nisn</label>
                <input
                    name="nisn"
                    id="nisn"
                    type="number"
                    className="p-[8px] border-2 bg-gray-200 outline-none"
                />
            </div>
            <div className="flex flex-col">
                <label htmlFor="nama">Nama</label>
                <input
                    name="nama"
                    id="nama"
                    type="text"
                    className="p-[8px] border-2 bg-gray-200 outline-none"
                />
            </div>
            <div className="flex flex-col">
                <label htmlFor="kasus">Kasus</label>
                <textarea
                  name="kasus"
                  id="kasus"
                  className="border-2 border-gray-400 outline-none"
                ></textarea>
            </div>
            <button className="bg-[#171717] text-white px-3 py-2 rounded-sm" type="submit">Submit</button>
        </form>
          <Link className="bg-[#171717] text-white px-3 py-2 rounded-sm" href='/'>Back</Link>
    </div>
  )
}

export default MainViews