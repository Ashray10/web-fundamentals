import "./App.css";
import { Button, Drawer, Form, Input, Table, Space } from "antd";
import { useState } from "react";

function App() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);

  const onFinishForm = (values) => {
    setData((prevState) => [...prevState, values]);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Standard",
      dataIndex: "standard",
      key: "standard",
    },
    {
      title: "Mobile Number",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "BloodGroup",
      dataIndex: "bloodGroup",
      key: "bloodGroup",
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Space size="middle">
          <a>Edit</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];
  return (
    <div style={{ margin: "20px" }}>
      <div style={{ float: "right" }}>
        <Button type="primary" onClick={() => setOpen(true)}>
          Add Student
        </Button>
        <Drawer open={open} onClose={() => setOpen(false)}>
          <Form name="addStudentForm" onFinish={onFinishForm}>
            <Form.Item label="Name" name="name">
              <Input />
            </Form.Item>
            <Form.Item label="Standard" name="standard">
              <Input />
            </Form.Item>
            <Form.Item label="Mobile No" name="phone">
              <Input />
            </Form.Item>
            <Form.Item label="Blood Group" name="bloodGroup">
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Drawer>
      </div>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
}

export default App;