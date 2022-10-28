import React from 'react'
import { Button, Drawer, Form, Input, Table, Space, Modal } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

export default function User() {
    const [open, setOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({});
    const [data, setData] = useState([]);
    const [dataFromApi, setDataFromApi]=useState([]);


    const onFinishForm = (values) => {
    axios.post('http://localhost:8080/user', values)
        .then((response) => {
        setData((prevState) => [...prevState, values]);
        }, (error) => {
        console.log(error);
        });
        console.log(values);
    };

    useEffect(()=>{
    axios
    .get("http://localhost:8080/user")
    .then(response => {
        var temp = Object.entries(response.data).map(([key, values]) => {
            // temp.push(values);
            return values;
        })
        setDataFromApi(temp);
        console.log("api",dataFromApi);
        console.log("data",data);
    })
        .catch(error => console.log(error));
        
    },[data]);

    const onDelete = (record, e) => {
    e.preventDefault();
    console.log(record);
    axios.delete('http://localhost:8080/user/'+record.userid);
    setData((prevState) => {
        return prevState.filter((state) => record.userid !== state.userid);
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
    axios.put('http://localhost:8080/user/'+editData.user_id, editData)
        .then(response => console.log(response.data.updatedAt));
    
    setData((pre) => {
        return pre.map((record) => {
        if (record.user_id === editData.user_id) {
            return editData;
        } else {
            return record;
        }
        });
    });
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
      <Button>
        <Link to="/todo">Todos</Link>
      </Button>
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
