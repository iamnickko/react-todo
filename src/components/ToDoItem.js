import classes from "./ToDoItem.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCircleCheck } from "@fortawesome/free-solid-svg-icons";

const ToDoItem = (props) => {

  const toDoItemClasses = props.completed
    ? `${classes.item} ${classes.completed}`
    : `${classes.item}`;

  return (
    <li key={props.id} className={toDoItemClasses}>
      <div>
        <p>{props.item}</p>
      </div>
      <div className={classes.delete}>
        <span onClick={props.onDeleteClick}>
          <FontAwesomeIcon icon={faTrash} />
        </span>
        <span onClick={props.onCompleteClick}>
          <FontAwesomeIcon icon={faCircleCheck} />
        </span>
      </div>
    </li>
  );
};

export default ToDoItem;
