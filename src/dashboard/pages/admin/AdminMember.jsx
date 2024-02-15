import React, { useContext, useEffect, useState } from "react";
import { GET_ALL_ADMINS, deleteAdmin } from "../../../services/auth";
import { Button, Modal, Table, message } from "antd";

const AdminMember = () => {
  const [admin, setAdmin] = useState([]); // STATE
  const [loading, setLoading] = useState(false); // STATE

  // ===> GET ALL AMDINS FROM SERVER <===
  const get_ADMINS = () => {
    setLoading(true);
    GET_ALL_ADMINS().then(({ data }) => {
      setAdmin(data);
      setLoading(false);
    });
  };
 
  useEffect(() => {
    get_ADMINS();
  }, []);

  // ===> DELETE THE ADMIN <===
  const deleteUser = (id, name) => {
    Modal.confirm({
      title: `Are you Sure To Delete ${name} ?`,
      okButtonProps: { className: "bg-green-500 border-0 text-white" },
      okText: "Yes",
      cancelText: "No",
      cancelButtonProps: { className: "bg-red-500 border-0 text-white" },

      onOk: () => {
        deleteAdmin(id)
          .then(() => {
            get_ADMINS();
            return message.info("Was Deleted Succesfly");
          })
          .catch((err) => {
            console.log(err.message);
          });
      },
      onCancel: () => {
        return message.info("The Operation was canceled !");
      },
    });
  };

  return (
    <>
      <div className="admin-user-container m-5 ">
        <div>
          <Table
            loading={loading}
            className="border border-gray-300 "
            columns={[
              { title: "Name", dataIndex: "name" },
              { title: "Surname", dataIndex: "surname" },
              { title: "Email", dataIndex: "email" },
              { title: "Role", dataIndex: "role" },

              {
                title: "Actions",
                render: (_, value) => (
                  <Button onClick={() => deleteUser(value._id, value.name)}>
                    Delete
                  </Button>
                ),
              },
            ]}
            dataSource={admin.map((data) => ({ ...data, key: data._id }))}
            pagination={{ pageSize: 10 }}
          ></Table>
        </div>
      </div>
    </>
  );
};

export default AdminMember;
