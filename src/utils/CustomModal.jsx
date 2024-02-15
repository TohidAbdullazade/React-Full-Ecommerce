import { Button, Form, Input, List, Modal } from "antd";
import React, { useState } from "react";

const CustomModal = () => {
  return (
    <>
      <Modal okText="Search" okButtonProps={{ className: "bg-green-500" }}>
        <Form className="m-5">
          <Form.Item>
            <Input
              placeholder="Search..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CustomModal;
