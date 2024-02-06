import React, { useContext, useEffect, useState } from "react";
import { GET_ALL_ADMINS, deleteAdmin } from "../../../services/auth";
import { Button, Modal, Table, message } from "antd";
import Topbar from "../../components/Topbar";
import { AuthContext } from "../../../context/AuthContext";

const AdminMember = () => {
  const [admin, setAdmin] = useState([]);
  const [loading, setLoading] = useState(false);
  const { roles } = useContext(AuthContext);

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

  const deleteUser = (id, name) => {
    Modal.confirm({
      title: `Are you Sure To Delete ${name} ?`,

      onOk: () => {
        GET_ALL_ADMINS().then(({ data }) => {
          if (data[0].role === "admin") {
            message.error("This Operation is only valid for superAdmin", 1.5);
            return;
          } else {
            deleteAdmin(id)
              .then(() => {
                get_ADMINS();
                return message.info("Was Deleted Succesfly");
              })
              .catch((err) => {
                console.log(err.message);
              });
          }
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
