import "./App.css";
import { Button, Drawer, Form, Input, Table, Space, Modal, Checkbox } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

function Todo() {
  const [open, setOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({});
    const [dataFromApi, setDataFromApi]=useState([]);


    const onFinishForm = (values) => {
        // values.add({"created": new Date()});
        // console.log(typeof values);
        axios.post('http://localhost:8080/todo', values)
        .then((response) => {
            retrivedata();
            },
            (error) => {
            console.log(error);
        });
        setOpen(false);
    };

    function retrivedata(){
        // console.log("Retrive");
        axios
        .get("http://localhost:8080/todo")
        .then(response => {
            console.log(response.data);
            let temp = Object.entries(response.data).map(([key, values]) => {
                return values;
            })
            setDataFromApi(temp);
        })
        .catch(error => console.log(error));
    }
    
    useEffect(()=>{
        // console.log(dataFromApi);
        retrivedata();
    },[]);    

    const onDelete = (record, e) => {
      // e.preventDefault();
      console.log("record",typeof record.created);
      axios.delete('http://localhost:8080/todo/'+record.todoid)
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
    axios.put('http://localhost:8080/user/'+editData.todoid, editData)
        .then(response => retrivedata());
    resetEditing();
    
  }
  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  const columns = [
    { title: "Todo ID", dataIndex: "todoid", key: "todoid" },
    { title: "Title", dataIndex: "title", key: "title"},
    { title: "Body", dataIndex: "body", key: "body" },
    { title: "Date of creation", dataIndex: "created", key: "created" },
    // { title: "Status", dataIndex: "status", key: "status" },
    { title: "User ID", dataIndex: "userid", key: "userid"},
   
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <button onClick={(e) => onEdit(record, e)}>Edit</button>
          <button onClick={(e) => onDelete(record, e)}>Delete</button>
          <Checkbox onChange={onChange}> </Checkbox>
        </Space>
      ),
    },
  ];
  return (
    
    <div style={{ margin: "20px" }}>
      <div style={{ float: "right" }}>
        <Button type="primary" onClick={() => setOpen(true)}>
          Add Task
        </Button>
        <Drawer open={open} onClose={() => {
          setOpen(false);
          console.log(open)}}>
          <Form name="addTodo" onFinish={onFinishForm}>
            <Form.Item label="Title" name="title">
              <Input />
            </Form.Item>
            <Form.Item label="Body" name="body">
              <Input />
            </Form.Item>
            <Form.Item label="Date of creation" name="created">
              <Input />
            </Form.Item>
            {/* <Form.Item label="Status" name="status">
              <Input />
            </Form.Item> */}
            <Form.Item label="User ID" name="userid">
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
        >Title
          <Input
            value={editData?.title}
            onChange={(e) => {
              setEditData((pre) => {
                return { ...pre, name: e.target.value };
              });
            }}
          />
          Body
          <Input
            value={editData?.body}
            onChange={(e) => {
              setEditData((pre) => {
                return { ...pre, name: e.target.value };
              });
            }}
          />Date of Creation
          <Input
            value={editData?.created}
            onChange={(e) => {
              setEditData((pre) => {
                return { ...pre, name: e.target.value };
              });
            }}
          />
          {/* <Input
            value={editData?.status}
            onChange={(e) => {
              setEditData((pre) => {
                return { ...pre, name: e.target.value };
              });
            }}
          /> */}
          User ID
          <Input
            value={editData?.userid}
            onChange={(e) => {
              setEditData((pre) => {
                return { ...pre, name: e.target.value };
              });
            }}
          />
         
        </Modal>
      </div>
    </div>
  );
}

export default Todo;