import "styles/App.css";
import logo from "assets/icons/logo.svg";
import { createBrowserRouter } from "react-router-dom";
import HomePage from "pages/HomePage";

function App() {
  return createBrowserRouter([{ path: "/", element: <HomePage /> }]);
}

export default App;
