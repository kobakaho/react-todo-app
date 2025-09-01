import { Link } from "react-router-dom";
import styles from "../styles/taskCard.module.css";
import { getPriorityClass } from "../utils/priority";
import { Task } from "../../../types/task";
import Checkbox from '@mui/material/Checkbox';

type Props = {
    task: Task;
    onToggleStatus: (taskId: Task['id'], newStatus: boolean) => void;
};
  // onToggleStatus関数
  // タスクID（数値型）と新しいステータス（真偽値）を受け取り、返り値がない関数（void）
  // Task['id'] は Task 型の id プロパティと同じ型（この場合 number）を再利用する記法
  // →id の型が将来変わっても他のコードに自動で反映されるため、保守性が高まる

export default function TaskCard({ task, onToggleStatus }: Props) { // onToggleStatusをpropsで受け取る 

  return (
    <div className={`${styles.taskCard} ${task.status ? styles.completed : ""}`}>
      <Checkbox
        checked={task.status}
        onChange={() => onToggleStatus(task.id, !task.status)}
        sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
      />
      <Link to={`/tasks/${task.id}`} className={styles.detailLink}>
        <h3 className={styles.taskTitle}>{task.title}</h3>
      </Link>
        <p className={`${styles.badge} ${getPriorityClass(task.priority, styles)}`}>{task.priority}</p>
        <p className={styles.dueDate}>～ {task.dueDate ? task.dueDate : "今日"}</p>
    </div>

    );
}
// タスクのステータスに応じてスタイルを適用
//　可読性を向上するためのコンポーネント分割
