import { Task } from "../../../types/task";
import TaskCard from "./TaskCard";
import styles from "../styles/TaskListContainer.module.css";

interface TaskListProps {
  tasks: Task[];
  onToggleStatus: (taskId: Task['id'], newStatus: boolean) => void;
}

export default function TaskList({ tasks, onToggleStatus }: TaskListProps) {
  return (
    <div>
      <div className={styles.taskList}>
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onToggleStatus={onToggleStatus}
          />
        ))}
      </div>
    </div>
  );
}

