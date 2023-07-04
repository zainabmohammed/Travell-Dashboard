import { Button, Card, Input, Space, Table, Tag, Typography } from "antd";
import "./style.css";
import { useEffect, useState } from "react";

const BookinsTable = () => {
  //TODO: id, cusomerName, customerPhone, customerAddress, tripTitle

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getbookingtable = () => {
    setLoading(true);
    fetch("https://travel-api-cpil.onrender.com/api/bookings")
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
    getbookingtable();
  }, []);

  // const dataSource = [
  //   {
  //     id: 1,
  //     customerName: 'احمد جبار مريوش',
  //     customerPhone: '07789882343',
  //     customerAddress: 'بغداد - المنصور',
  //     tripName: 'سفره الى الله'
  //   },
  //   {
  //     id: 2,
  //     customerName: 'زينب علاء سلمان',
  //     customerPhone: '07789882343',
  //     customerAddress: 'بغداد - المريخ',
  //     tripName: 'سفره الى المريخ'
  //   },

  // ];

  const statusColor ={
    PENDING: 'orange',
    ACCEPTED:'success',
    REJECTED: 'error'
  }

  const handleChangeStatus = (id, status) => {
    setLoading(true);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      status,
    });

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
    };

    fetch(
      `https://travel-api-cpil.onrender.com/api/bookings/status/${id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => getbookingtable())
      .catch((error) => {
        setLoading(false);
        console.log("error", error);
      });
  };

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
      dataIndex: "trip",
      key: "trip",
      render: (trip) => trip?.title
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => <Tag color={statusColor[status]}>{status}</Tag>
    },
    {
      title: "Actions",
      dataIndex: "id",
      key: "id",
      render: (id, row) => (
        <Space>
          {row?.status !== "ACCEPTED" && (
            <Button
              onClick={() => handleChangeStatus(id, "ACCEPTED")}
              size="small"
            >
              Accept
            </Button>
          )}
          {row?.status !== "REJECTED" && (
            <Button
              onClick={() => handleChangeStatus(id, "REJECTED")}
              danger
              size="small"
            >
              Reject
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div className="bookings-table">
      <Card>
        <div className="app-flex-space">
          <Input.Search style={{ width: 300 }} placeholder="Serach order" />
          <Button loading={loading} onClick={getbookingtable}>
            Refresh
          </Button>
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

export default BookinsTable;
