import { useState, useEffect } from "react";
import { getTasks } from "../api/Task/getTasks";
import { updateTask } from "../api/Task/updateTask";
import { Task } from "../../../types/task";
import { applyFilter, sortTasks } from "../utils/taskFilters";
import { TaskFilter } from "../components/TaskFilters";
import { toast } from 'react-toastify';

import TaskList from "../components/TaskList";
import Circular from "../../../shared/components/Circular"
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import TaskFormContainer from "./TaskFormContainer";
import Tooltip from '@mui/material/Tooltip';
import styles from "../styles/TaskListContainer.module.css";

export default function TaskListContainer() {
  const [loading, setLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<{
      priority?: string,
      status?: string,
      dueDate?: "past" | "today" | "upcoming",
  }>({});
  const [sortKey, setSortKey] = useState<"createdAt" | "dueDate">("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [open, setOpen] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false);

  const handleToggleSort = () => {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  useEffect(() => {
    const unsubscribe = getTasks((allTasks) => {
      let filteredTasks = allTasks.filter((task) => {
        if (showCompleted) {
          return true;
        } else {
        return task.status === false; // 未完了タスクのみ表示
        }
      });
      filteredTasks = applyFilter(filteredTasks, filter);
      filteredTasks = sortTasks(filteredTasks, sortKey, sortOrder);
      setTasks(filteredTasks);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [filter, sortKey, sortOrder, showCompleted]);

  const handleToggleStatus = async (taskId: Task['id'], newStatus: boolean) => {
    try {
      await updateTask(String(taskId), {
        status: newStatus,
        archived: newStatus
      });
      // 状態更新が成功したら、リストを再読み込みして分類し直す
      if (newStatus) {
        setTasks((prev) => prev.filter((task) => task.id !== taskId));
        console.log("タスクが完了・アーカイブされ、リストから削除されました。");
      }
    } catch (error) {
      toast.error("タスクの更新に失敗しました。");
    }
  };

  if (loading) return <Circular />;

  return (
    <div className={styles.Container}>
      <div className={styles.Button}>
        <Tooltip title="新規作成">
          <Fab color="primary" aria-label="add" onClick={() => {setOpen(true)}}>
            <AddIcon />
          </Fab>
        </Tooltip>
        <TaskFormContainer open={open} onClose={() => {setOpen(false)}} />
      </div>
      <TaskFilter
        filter={filter}
        setFilter={setFilter}
        sortKey={sortKey}
        setSortKey={setSortKey}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        handleToggleSort={handleToggleSort}
        showCompleted={showCompleted}
        setShowCompleted={setShowCompleted}
      />
      <TaskList tasks={tasks} onToggleStatus={handleToggleStatus} />
    </div>
  );
}

