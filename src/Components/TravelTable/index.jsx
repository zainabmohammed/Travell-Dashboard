import { Button, Card, Divider, Input, Space, Table, Tag, Typography } from "antd";
import {
  FileImageOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import "./style.css";

const TravelTable = () => {
  const dataSource = [
    {
      id: 1,
      title: "سفرة الى الله",
      place: "اربيل",
      content: "هذا النص تجريبي ولايعتبر نص حقيقي فقط باوع واسكت",
      price: 55000,
    },
    {
      id: 2,
      title: "سفرة الى المريخ",
      place: "المريخ",
      content: "هذا النص تجريبي ولايعتبر نص حقيقي فقط باوع واسكت",
      price: 150000,
    },
  ];

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
      render: (title)=> <b>{title}</b>
    },
    {
      title: "Place",
      dataIndex: "place",
      key: "place", 
      render: (place)=> <Tag color="geekblue">{place}</Tag>
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
      render: () => (
        <Space>
          <Button size="small" icon={<FileImageOutlined />}>
            Image
          </Button>
          <Divider type="vertical" />
          <Button size="small" icon={<EditOutlined />} />
          <Button danger size="small" icon={<DeleteOutlined />} />
        </Space>
      ),
    },
  ];

  return (
    <div className="travells-table">
      <Card>
        <div className="app-flex-space">
          <Input.Search style={{ width: 300 }} placeholder="Serach Trip" />
          <Button type="primary">+ New Trip</Button>
        </div>
        <br />
        <Table size="small" dataSource={dataSource} columns={columns} />
      </Card>
    </div>
  );
};

export default TravelTable;
