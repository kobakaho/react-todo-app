import { Task } from "../../../types/task";
import TaskCard from "./TaskCard";
import styles from "../styles/TaskListContainer.module.css";

type Props = {
  tasks: Task[];
  onToggleStatus: (taskId: Task['id'], newStatus: boolean) => void;
}

export default function TaskList({ tasks, onToggleStatus }: Props) {
  return (
    <div>
      <div className={styles.taskList}>
        {tasks && tasks.length > 0 ? (
        tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onToggleStatus={onToggleStatus}
          />
        ))
      ) : (
        <p className={styles.task}>タスクはありません。作成してみましょう！</p>
      )}
      </div>
    </div>
  );
}

