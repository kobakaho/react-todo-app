import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";
import { getPriorityClass } from "../utils/priority";
import { Task } from "../../../types/task";
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
import Badge from '@mui/material/Badge';
import TaskOutlinedIcon from '@mui/icons-material/TaskOutlined';
import styles from "../styles/taskCard.module.css";


type Props = {
    task: Task;
    onToggleStatus: (taskId: Task['id'], newStatus: boolean) => void;
};
  // onToggleStatus関数
  // タスクID（数値型）と新しいステータス（真偽値）を受け取り、返り値がない関数（void）
  // Task['id'] は Task 型の id プロパティと同じ型（この場合 number）を再利用する記法
  // →id の型が将来変わっても他のコードに自動で反映されるため、保守性が高まる

export default function TaskCard({ task, onToggleStatus }: Props) { // onToggleStatusをpropsで受け取る 
  const [incompleteTodos, setIncompleteTodos] = useState<number>(0);

  useEffect(() => {
    const checkTodos = async () => {
      const todosRef = collection(db, "tasks", task.id, "todos");
      const todoSnapshot = await getDocs(todosRef);
      const incompleteTodos = todoSnapshot.docs.filter(doc => doc.data().status === false);
      setIncompleteTodos(incompleteTodos.length);
    };

    checkTodos();
  }, [task.id]);

  return (
      <div className={`${styles.taskCard} ${task.status ? styles.completed : ""}`}>
        <Tooltip title={task.status ? "完了を取り消す" : "完了する"}>
          <Checkbox
            checked={task.status}
            onChange={() => onToggleStatus(task.id, !task.status)}
            sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
          />
        </Tooltip>
        <Link to={`/tasks/${task.id}`} className={styles.detailLink}>
          <h3 className={styles.taskTitle}>{task.title}</h3>
        </Link>
          <Badge
            badgeContent={incompleteTodos > 0 ? incompleteTodos : 0}
            color="primary"
            sx={{ visibility: incompleteTodos > 0 ? "visible" : "hidden" }} // 空ならスペースを保持
          >
            <Tooltip title={"サブタスクがあります"}>
              <TaskOutlinedIcon />
            </Tooltip>
          </Badge>
          <p className={`${styles.badge} ${getPriorityClass(task.priority, styles)}`}>{task.priority}</p>
          <Chip
              variant="outlined"
              color="success"
              label={`～ ${task.dueDate ? task.dueDate : "今日"}`}
              className={styles.info}
          />
      </div>
  );
}
// タスクのステータスに応じてスタイルを適用
//　可読性を向上するためのコンポーネント分割
