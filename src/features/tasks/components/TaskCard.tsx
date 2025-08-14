import { Link } from "react-router-dom";
// import { Priority, Task } from "../../../types/task"; 
import styles from "../styles/taskCard.module.css";
import { getPriorityClass } from "../utils/priority";
import { getStatusLabel } from "../utils/status-label";
import { Task } from "../../../types/task";

type Props = {
    task: Task;
};

export default function TaskCard({ task }: Props) {
    return (
      <div className={styles.taskCard}>
        <Link to={`/tasks/${task.id}`} className={styles.detailLink}>
          <h3 className={styles.taskTitle}>{task.title}</h3>
        </Link>
        <p className={`${styles.badge} ${task.status ? styles.completed : styles.incomplete}`}>
          {getStatusLabel(task.status)}
        </p>
        <p className={`${styles.badge} ${getPriorityClass(task.priority, styles)}`}>{task.priority}</p>
        <p className={styles.taskDueDate}>{task.dueDate}</p>
      </div>
    );
}
// タスクのステータスに応じてスタイルを適用
//　可読性を向上するためのコンポーネント分割