import { Fragment, useState } from "react";
import Header from "./components/Header";
import ToDoList from "./components/ToDoList";

function App() {
  const [newTask, setNewTask] = useState('')

  const addTaskHandler = (enteredTask) => {
    setNewTask(enteredTask)
  };

  return (
    <Fragment>
      <Header onAddTask={addTaskHandler} />
      <ToDoList newTask={newTask} />
    </Fragment>
  );
}

export default App;
