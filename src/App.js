import React from "react";
import TaskTracker from "./components/TaskTracker";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <div className="container mt-4">
      <h1 className="text-center">Task Tracker</h1>
      <TaskTracker />
    </div>
  );
};

export default App;
