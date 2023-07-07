import "antd/dist/reset.css";
import "./App.css";

import HomeScreen from "./Screens/HomeScreen";
import LoginScreen from "./Screens/LoginScreen";
import { useAppStore } from "./appStore";

function App() {
  const { isLogin } = useAppStore();

  return isLogin ? <HomeScreen /> : <LoginScreen />;
}
export default App;
