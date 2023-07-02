import "antd/dist/reset.css";
import "./App.css";
import MainHeader from "./Components/Header";
import BookinsTable from "./Components/BookingsTable";
import TravelTable from "./Components/TravelTable";
import { useAppStore } from "./appStore";

function App() {
  const { screen } = useAppStore();

  const screens = {
    Bookings: <BookinsTable />,
    Travells: <TravelTable />,
  };

  return (
    <div className="app-container">
      <MainHeader />
      {screens[screen]}
    </div>
  );
}
export default App;
