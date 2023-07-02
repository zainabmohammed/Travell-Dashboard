import { Avatar, Divider, Segmented, Space, Typography } from "antd";
import { useAppStore } from "../../appStore";

function MainHeader() {
  const { screen, setScreen } = useAppStore();

  return (
    <header>
      <Typography.Title type="secondary" level={5}>
        Travell Dashboard
      </Typography.Title>
      <Divider/>
      <div className="app-flex-space" style={{ marginTop: 20 }}>
        <Segmented
          value={screen}
          onChange={(val) => setScreen(val)}
          options={["Bookings", "Travells"]}
        />
        <Space>
          <Typography.Text>Admin</Typography.Text>
          <Avatar />
        </Space>
      </div>
    </header>
  );
}
export default MainHeader;
