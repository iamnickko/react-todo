import { useState } from "react";
import Card from "../UI/Card";
import classes from "./Header.module.css";

const Header = (props) => {
  const [enteredTask, setEnteredTask] = useState("");

  const dateOptions = { weekday: "long", month: "long", day: "numeric" };
  const date = new Date().toLocaleDateString("en-GB", dateOptions);

  const taskChangeHandler = (event) => {
    setEnteredTask(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (enteredTask.trim() === "") {
      return;
    }
    const addTask = async () => {
      const response = await fetch("https://dummyjson.com/todos/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          todo: enteredTask,
          completed: false,
          userId: 1,
        }),
      });
      const data = await response.json();
      props.onAddTask(data);
    };
    addTask();
    setEnteredTask("");
  };

  return (
    <Card>
      <header>
        <div className={classes.summary}>
          <div>{date}</div>
        </div>
        <div className={classes.input}>
          <form onSubmit={submitHandler}>
            <input
              type="text"
              id="task"
              placeholder="Enter a task..."
              onChange={taskChangeHandler}
              value={enteredTask}
            />
            <button>Add Task</button>
          </form>
        </div>
      </header>
    </Card>
  );
};

export default Header;
