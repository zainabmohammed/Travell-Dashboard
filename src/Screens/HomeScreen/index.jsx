
import MainHeader from "../../Components/Header";
import BookinsTable from "../../Components/BookingsTable";
import TravelTable from "../../Components/TravelTable";
import { useAppStore } from "../../appStore";

function HomeScreen() {
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
export default HomeScreen;
