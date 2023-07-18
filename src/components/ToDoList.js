import classes from "./ToDoList.module.css";
import Card from "../UI/Card";
import ToDoItem from "./ToDoItem";
import { useEffect, useState } from "react";

const ToDoList = (props) => {
  const [taskList, setTaskList] = useState([]);
  const { newTask } = props;

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch("https://dummyjson.com/todos/", {
        limit: 30,
      });
      const data = await response.json();
      const taskList = data.todos;
      setTaskList(taskList);
    };
    fetchTasks();
  }, []);

  useEffect(() => {
    setTaskList((prevState) => {
      return [newTask, ...prevState];
    });
  }, [newTask]);

  const completeClickHandler = (taskToUpdate) => {
    const existingTaskIndex = taskList.findIndex(
      (task) => task.id === taskToUpdate.id
    );
    const existingTask = taskList[existingTaskIndex];
    let updatedList;
    const updatedTask = {
      ...existingTask,
      completed: !existingTask.completed,
    };
    updatedList = [...taskList];
    updatedList[existingTaskIndex] = updatedTask;
    setTaskList(updatedList);
  };

  const deleteClickHandler = (id) => {
    const updatedTaskList = taskList.filter((task) => task.id !== id);
    setTaskList(updatedTaskList);
  };

  return (
    <Card>
      <ul className={classes["todo-list"]}>
        {taskList &&
          taskList.map((task) => (
            <ToDoItem
              key={task.id}
              id={task.id}
              item={task.todo}
              completed={task.completed}
              onCompleteClick={completeClickHandler.bind(null, task)}
              onDeleteClick={deleteClickHandler.bind(null, task.id)}
            />
          ))}
      </ul>
    </Card>
  );
};

export default ToDoList;
