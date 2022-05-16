import React, { useEffect } from "react";
import "./App.css";
import { UserService } from "./services/user.service";
import { HomePage } from "./pages/HomePage";

const App: React.FC = () => {
  const userService: UserService = new UserService();

  const addUser = async () => {
    try {
      await userService.adduser();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    addUser();
  }, []);

  return (
    <div className="App">
      <HomePage />
    </div>
  );
};

export default App;
