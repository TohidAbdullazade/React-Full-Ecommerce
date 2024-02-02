import React, { useEffect, useState } from "react";
import { GET_ALL_ADMINS, deleteAdmin } from "../../../services/auth";
import { Button, Modal, Table, message } from "antd";
import Topbar from "../../components/Topbar";

const AdminMember = () => {
  const [admin, setAdmin] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const deleteUser = (id) => {
    Modal.confirm({
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
        return message.info("The Operation was canceled from SuperAdmin");
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
              { title: "Password", dataIndex: "password" },
              {
                title: "Actions",
                render: (_, value) => (
                  <Button onClick={() => deleteUser(value._id)}>Delete</Button>
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
