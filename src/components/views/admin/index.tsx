import Link from "next/link";
import React, { useState } from "react";
import { usePDF } from "react-to-pdf";

type userDataTypes = {
  id: number;
  nisn: number;
  nama: string;
  kasus: string;
};


const AdminViews = ({ userdatas }: { userdatas: userDataTypes[] }) => {
  const { toPDF, targetRef } = usePDF({ filename: "ReportAdmin.pdf" });
  const [input, setInput] = useState("");

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <h1>Admin Report</h1>

      <div>
        <div className="w-full flex">
          <div>O</div>
          <input
            placeholder="Search"
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
      </div>

      <div className="w-[70%] mt-3" ref={targetRef}>
          <table className="border border-slate-500">
            <thead>
              <tr>
                <th className="border p-2 border-slate-600">Nisn</th>
                <th className="border p-2 border-slate-600">Nama</th>
                <th className="border p-2 border-slate-600">Kasus</th>
              </tr>
            </thead>
            <tbody>
              {userdatas.filter(item=>item.nama.toLowerCase().includes(input)).map((item: any) => (
                <tr key={item.id}>
                  <th className="border p-2 border-slate-600">{item.nisn}</th>
                  <th className="border p-2 border-slate-600">{item.nama}</th>
                  <th className="border p-2 border-slate-600">{item.kasus}</th>
                </tr>
              ))}
            </tbody>
          </table>
      </div>

      <Link className="p-3 mt-5 bg-slate-600 rounded-sm text-white" href="/">
        Home
      </Link>

      <button
        onClick={() => toPDF()}
        className="mt-9 py-2 px-3 bg-slate-600 rounded-sm text-white"
      >
        Keep PDF
      </button>
    </div>
  );
};

export default AdminViews;
