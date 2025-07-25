import { Outlet } from "react-router";
import "./App.css";
import { useState } from "react";
import Footer from "./components/Footer/Footer";
import NavBar from "./components/NavBar/NavBar";

type User = {
  id: number;
  email: string;
};

type Auth = {
  user: User;
  token: string;
};

function App() {
  const [auth, setAuth] = useState<Auth | null>(null);
  return (
    <>
      <NavBar />
      <Outlet context={{ auth, setAuth }} />
      <Footer />
    </>
  );
}

export default App;
