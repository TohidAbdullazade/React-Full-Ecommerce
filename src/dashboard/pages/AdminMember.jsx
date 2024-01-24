import React, { useEffect, useState } from "react";
import { GET_ALL_ADMINS, deleteAdmin } from "../../services/auth";

const AdminMember = () => {
  const [admin, setAdmin] = useState([]);

  const get_ADMINS = () => {
    GET_ALL_ADMINS().then(({ data }) => {
      setAdmin(data);
    });
  };
  useEffect(() => {
    get_ADMINS();
  }, []);

  const deleteUser = (id) => {
    deleteAdmin(id).then(() => {
      get_ADMINS();
    });
  };

  return (
    <>
      <div className="admin-user-container">
        <div>
          <table className="border border-black p-2.5">
            <thead>
              <tr>
                <th className="bg-slate-100">Name</th>
                <th className="bg-slate-100">Surname</th>
                <th className="bg-slate-100">Email</th>
                <th className="bg-slate-100">Password</th>
                <th className="bg-slate-100">Actions</th>
              </tr>
            </thead>
            <tbody>
              {admin.map((staff) => (
                <tr key={staff._id}>
                  <td className="border  border-gray-300">{staff.name}</td>
                  <td className="border  border-gray-300">{staff.surname}</td>
                  <td className="border  border-gray-300">{staff.email}</td>
                  <td className="border  border-gray-300">{staff.password}</td>
                  <td>
                    <button onClick={() => deleteUser(staff._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdminMember;
