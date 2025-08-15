import { Link } from "react-router-dom";
// import { Priority, Task } from "../../../types/task";
import styles from "../styles/taskDetail.module.css";
import { getPriorityClass } from "../utils/priority";
import { getStatusLabel } from "../utils/status-label";
import { Task } from "../../../types/task";

type Props = {
    task: Task;
};  

export default function TaskDetail({ task }: Props) {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{task.title}</h1>
            <p className={styles.description}>{task.description}</p>
            <p className={styles.info}>
                ステータス:{" "}
                <span 
                className={`${styles.badge} ${
                    task.status ? styles.completed : styles.incomplete
                }`}
                >
                {getStatusLabel(task.status)}
                </span>
            </p>
            <p className={styles.info}>
                優先度 :{" "}
                <span className={`${styles.badge} ${getPriorityClass(task.priority, styles)}`}> 
                {task.priority}
                </span>
            </p>    
            <p className={styles.info}>期限日: {task.dueDate}</p>
            <p className={styles.info}>
                作成日: {new Date(task.createdAt).toLocaleString()}
            </p>
            <p className={styles.info}>
                更新日: {new Date(task.updatedAt).toLocaleString()}
            </p>
            <div className={styles.links}>
                <Link to={`/tasks/${task.id}/edit`} className={styles.editLink}>
                    タスクを編集
                </Link>
                <Link to="/tasks" className={styles.backLink}>
                    戻る
                </Link>
            </div>
        </div>
    );
}