import "./App.css";
import { Button, Drawer, Form, Input, Table, Space } from "antd";
// import { useState } from "react";
import { PureComponent } from "react";

export default class App1 extends PureComponent{

  constructor(){
    super();
    this.state={
        open:false,
        data:[]
    }
}
  onFinishForm(values){
    let newData = [...this.state.data, values];
    this.setState({data: newData});
    this.setState({open: false});
  };

    fields = [
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
    // {
    //   title: "Action",
    //   key: "action",
    //   render: () => (
    //     <Space size="middle">
    //       <a>Edit</a>
    //       <a>Delete</a>
    //     </Space>
    //   ),
    // },
  ];
  render(){return (
    <div style={{ margin: "20px" }}>
      <div style={{ float: "right" }}>
        <Button type="primary" onClick={() => this.setState({open: true})}>
          Add Student
        </Button>
        <Drawer open={this.state.open} onClose={() => this.setState({open: false})}>
          <Form name="addStudentForm" onFinish={item => {
            console.log(item)
            this.onFinishForm(item)}}>
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
        <Table columns={this.fields} dataSource={this.state.data} />
      </div>
    </div>
  );}
}