import {
  Button,
  Card,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Popover,
  Row,
  Space,
  Table,
  Tag,
  Typography,
  message,
} from "antd";
import {
  FileImageOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import "./style.css";
import React, { useEffect, useState } from "react";

const MyFormItemContext = React.createContext([]);
function toArr(str) {
  return Array.isArray(str) ? str : [str];
}
const MyFormItemGroup = ({ prefix, children }) => {
  const prefixPath = React.useContext(MyFormItemContext);
  const concatPath = React.useMemo(
    () => [...prefixPath, ...toArr(prefix)],
    [prefixPath, prefix]
  );

  return (
    <MyFormItemContext.Provider value={concatPath}>
      {children}
    </MyFormItemContext.Provider>
  );
};
const MyFormItem = ({ name, ...props }) => {
  const prefixPath = React.useContext(MyFormItemContext);
  const concatName =
    name !== undefined ? [...prefixPath, ...toArr(name)] : undefined;
  return <Form.Item name={concatName} {...props} />;
};

const TravelTable = () => {
  // const [currentIndex, setCurrentIndex] =useState(0)
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onFinish = (value) => {
    setAddLoading(true);
    value.date = value.date.toString();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify(value);
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    fetch("https://travel-api-cpil.onrender.com/api/trips", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        message.success("Create Succefulley!");
        setIsModalOpen(false);
        getTraveltable();
        setAddLoading(true);
      })
      .catch((error) => {
        setAddLoading(false);
        console.log("error", error);
      });
  };

  const getTraveltable = () => {
    setLoading(true);
    fetch("https://travel-api-cpil.onrender.com/api/trips")
      .then((res) => res.json())
      .then((datatable) => {
        setData(datatable?.records);
        console.log(datatable);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  useEffect(() => {
    getTraveltable();
  }, []);

  const deletTrip = (id) => {
    setLoading(true);
    var requestOptions = {
      method: "DELETE",
    };
    fetch(
      `https://travel-api-cpil.onrender.com/api/trips/${id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        getTraveltable();
      })
      .catch((error) => console.log("error", error));
  };

  // const dataSource = [
  //   {
  //     id: 1,
  //     title: "سفرة الى الله",
  //     place: "اربيل",
  //     content: "هذا النص تجريبي ولايعتبر نص حقيقي فقط باوع واسكت",
  //     price: 55000,
  //   },
  //   {
  //     id: 2,
  //     title: "سفرة الى المريخ",
  //     place: "المريخ",
  //     content: "هذا النص تجريبي ولايعتبر نص حقيقي فقط باوع واسكت",
  //     price: 150000,
  //   },
  // ];

  const columns = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (title) => <b>{title}</b>,
    },
    {
      title: "Place",
      dataIndex: "place",
      key: "place",
      render: (place) => <Tag color="geekblue">{place}</Tag>,
    },
    {
      title: "content",
      dataIndex: "content",
      key: "content",
      render: (content) => (
        <Typography.Text style={{ fontSize: 16 }} type="secondary">
          {content}
        </Typography.Text>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => <b>{Number(price).toLocaleString("en")} IQD</b>,
    },
    {
      title: "Actions",
      dataIndex: "id",
      key: "id",
      render: (id, row) => (
        <Space>
          <Popover content={<img style={{width: 200}} src={row?.img}/>}>

          <Button size="small" icon={<FileImageOutlined />}>
            Image
          </Button>
          </Popover>
          <Divider type="vertical" />
          <Button size="small" icon={<EditOutlined />} />
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            onConfirm={()=> deletTrip(id)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              danger
              size="small"
              icon={<DeleteOutlined />}
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="travells-table">
      <Card>
        <div className="app-flex-space">
          <Input.Search style={{ width: 300 }} placeholder="Serach Trip" />
          <Button type="primary" onClick={showModal}>
            + New Trip
          </Button>
          <Modal
            title="Basic Modal"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={null}
          >
            <Form name="form_item_path" layout="vertical" onFinish={onFinish}>
              <Row gutter={8}>
                <Col span={14}>
                  <Form.Item name="title" label="Title">
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={10}>
                  <Form.Item name="place" label="place">
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={10}>
                  <Form.Item name="price" label="price">
                    <InputNumber style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item name="days" label="N.of Days">
                    <InputNumber style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item name="date" label="Date">
                    <DatePicker style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item name="img" label="Image Url">
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item name="content" label="content">
                    <Input.TextArea />
                  </Form.Item>
                </Col>
              </Row>

              <Button loading={addLoading} type="primary" htmlType="submit">
                Submit
              </Button>
            </Form>
          </Modal>
        </div>
        <br />
        <Table
          loading={loading}
          size="small"
          dataSource={data}
          columns={columns}
        />
      </Card>
    </div>
  );
};

export default TravelTable;
