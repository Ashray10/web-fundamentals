import React from 'react'
import { Button, Drawer, Form, Input, Table, Space, Modal } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";

export default function TestUser() {
    const [open, setOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({});
    const [dataFromApi, setDataFromApi]=useState([]);


    const onFinishForm = (values) => {
        axios.post('http://localhost:8080/user', values)
        .then((response) => {
            retrivedata();
            },
            (error) => {
            console.log(error);
        });
        setOpen(false);
    };

    function retrivedata(){
        console.log("Retrive");
        axios
        .get("http://localhost:8080/user")
        .then(response => {
            let temp = Object.entries(response.data).map(([key, values]) => {
                return values;
            })
            setDataFromApi(temp);
        })
        .catch(error => console.log(error));
    }
    
    useEffect(()=>{
        console.log(dataFromApi);
        retrivedata();
    },[]);    

    const onDelete = (record, e) => {
      e.preventDefault();
      console.log(record);
      axios.delete('http://localhost:8080/user/'+record.userid)
      .then((response) => {
        retrivedata();
        }, (error) => {
        console.log(error);
        });
    };

  const onEdit = (record, e) => {
    e.preventDefault();
    setIsEditing(true);
    setEditData({ ...record });
  };

  const resetEditing = () => {
    setIsEditing(false);
    setEditData(null);
  };
  const editResponce = ()=>{
    axios.put('http://localhost:8080/user/'+editData.userid, editData)
        .then(response => retrivedata());
    resetEditing();
    
  }
    const columns = [
        { title: "ID", dataIndex: "userid", key: "userid" },
        {
          title: "FirstName",
          dataIndex: "firstName",
          key: "firstName",
        },
        {
          title: "LastName",
          dataIndex: "lastName",
          key: "lastName",
        },
        {
          title: "Email",
          dataIndex: "email",
          key: "email",
        },
        {
          title: "Action",
          key: "action",
          render: (_, record) => (
            <Space size="middle">
              <button onClick={(e) => onEdit(record, e)}>Edit</button>
              <button onClick={(e) => onDelete(record, e)}>Delete</button>
            </Space>
          ),
        },
      ];
  return (
    <div style={{ margin: "20px" }}>
      <div style={{ float: "right" }}>
        <Button type="primary" onClick={() => setOpen(true)}>
          Add User
        </Button>
        <Drawer open={open} onClose={() => setOpen(false)}>
          <Form name="AddUser" onFinish={onFinishForm}>
            <Form.Item label="FirstName" name="firstName">
              <Input />
            </Form.Item>
            <Form.Item label="LastName" name="lastName">
              <Input />
            </Form.Item>
            <Form.Item label="Email" name="email">
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
        <Table columns={columns} dataSource={dataFromApi} />
        <Modal
          open={isEditing}
          okText="save"
          onCancel={() => resetEditing()}
          onOk={() => editResponce()}
        >
          FirstName
          <Input
            value={editData?.firstName}
            onChange={(e) => {
              setEditData((pre) => {
                return { ...pre, firstName: e.target.value };
              });
            }}
          />
          LastName
          <Input
            value={editData?.lastName}
            onChange={(e) => {
              setEditData((pre) => {
                return { ...pre, lastName: e.target.value };
              });
            }}
          />
          Email
          <Input
            value={editData?.email}
            onChange={(e) => {
              setEditData((pre) => {
                return { ...pre, email: e.target.value };
              });
            }}
          />
        </Modal>
      </div>
    </div>
  )
}
