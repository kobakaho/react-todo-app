import { Link } from "react-router-dom";
// import { Priority, Task } from "../../../types/task"; 
import styles from "../styles/taskCard.module.css";
import { getPriorityClass } from "../utils/priority";
import { getStatusLabel } from "../utils/status-label";
import { Task } from "../../../types/task";

type Props = {
    task: Task;
    onToggleStatus: (taskId: Task['id'], newStatus: boolean) => void;
};
  // onToggleStatus関数
  // タスクID（数値型）と新しいステータス（真偽値）を受け取り、返り値がない関数（void）
  // Task['id'] は Task 型の id プロパティと同じ型（この場合 number）を再利用する記法
  // →id の型が将来変わっても他のコードに自動で反映されるため、保守性が高まる

export default function TaskCard({ task, onToggleStatus }: Props) { // onToggleStatusをpropsで受け取る 
  // handleStatusChange関数
  // セレクトボックスでステータスが変更されたらonToggleStatus関数を呼び出して、ステータスを更新する処理を行う
  // セレクトボックスの値が変更されたらhandleStatusChange関数を呼び出す
  const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStatus = e.target.value === "true";
    if (onToggleStatus) {
      onToggleStatus(task.id, newStatus);
    }
  };

  return (
    <div className={styles.taskCard}>
      <Link to={`/tasks/${task.id}`} className={styles.detailLink}>
        <h3 className={styles.taskTitle}>{task.title}</h3>
      </Link>
      <select 
        value={task.status ? "true" : "false"} 
        onChange={handleStatusChange}
        className={`${styles.badge} ${task.status ? styles.completed : styles.incomplete}`}>
        <option value="false">{getStatusLabel(false)}</option>
        <option value="true">{getStatusLabel(true)}</option>
      </select>
        <p className={`${styles.badge} ${getPriorityClass(task.priority, styles)}`}>{task.priority}</p>
        <p className={styles.taskDueDate}>{task.dueDate}</p>
      </div>
    );
}
// タスクのステータスに応じてスタイルを適用
//　可読性を向上するためのコンポーネント分割