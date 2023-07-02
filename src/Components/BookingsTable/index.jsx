import { Button, Card, Input, Space, Table, Typography } from "antd";

import "./style.css";

const BookinsTable = () => {
  //TODO: id, cusomerName, customerPhone, customerAddress, tripTitle
  const dataSource = [
    {
      id: 1,
      customerName: 'احمد جبار مريوش',
      customerPhone: '07789882343',
      customerAddress: 'بغداد - المنصور',
      tripName: 'سفره الى الله'
    },
    {
      id: 2,
      customerName: 'زينب علاء سلمان',
      customerPhone: '07789882343',
      customerAddress: 'بغداد - المريخ',
      tripName: 'سفره الى المريخ'
    },

  ];

  const columns = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Customer",
      dataIndex: "customerName",
      key: "customerName",
      render: (customerName) => <b>{customerName}</b>,
    },
    {
      title: "Phone",
      dataIndex: "customerPhone",
      key: "customerPhone",
    },
    {
      title: "Address",
      dataIndex: "customerAddress",
      key: "customerAddress",
      render: (customerAddress) => (
        <Typography.Text type="secondary">{customerAddress}</Typography.Text>
      ),
    },
    {
      title: "Trip",
      dataIndex: "tripTitle",
      key: "tripTitle",
    },
    {
      title: "Actions",
      dataIndex: "id",
      key: "id",
      render: () => (
        <Space>
          <Button size="small">Accept</Button>
          <Button danger size="small">
            Reject
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="bookings-table">
      <Card>
        <div className="app-flex-space">
          <Input.Search style={{ width: 300 }} placeholder="Serach order" />
          <Button>Refresh</Button>
        </div>
        <br />
        <Table size="small" dataSource={dataSource} columns={columns} />
      </Card>
    </div>
  );
};

export default BookinsTable;
