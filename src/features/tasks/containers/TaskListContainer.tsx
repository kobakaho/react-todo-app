import { useState, useEffect } from "react";
import { getTasks } from "../api/getTasks";
import { updateTask } from "../api/updateTask";
import { Task } from "../../../types/task";
import { applyFilter, sortTasks } from "../utils/taskFilters";
import { TaskFilter } from "../components/TaskFilters";
import TaskList from "../components/TaskList";
import Circular from "../../../shared/components/Circular"
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import TaskFormContainer from "./TaskFormContainer";
import Tooltip from '@mui/material/Tooltip';
import styles from "../styles/TaskListContainer.module.css";

export default function TaskListContainer() {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [filter, setFilter] = useState<{
        priority?: string,
        status?: string,
        dueDate?: "past" | "today" | "upcoming",
    }>({});
    const [sortKey, setSortKey] = useState<"createdAt" | "dueDate">("createdAt");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    const [tasks, setTasks] = useState<Task[]>([]);
    const [open, setOpen] = useState(false);

    const handleToggleSort = () => {
        setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    };

    useEffect(() => {
        const unsubscribe = getTasks((allTasks) => {
            let filteredTasks = applyFilter(allTasks, filter);
            filteredTasks = sortTasks(filteredTasks, sortKey, sortOrder);
            setTasks(filteredTasks);
            setLoading(false);
        });
        return () => unsubscribe();
    }, [filter, sortKey, sortOrder]);

    const handleToggleStatus = async (taskId: Task['id'], newStatus: boolean) => {
        try {
            await updateTask(String(taskId), { status: newStatus });
            // 状態更新が成功したら、リストを再読み込みして分類し直す
        } catch (error) {
            setError("タスクの更新に失敗しました。");
            console.error("タスクの更新に失敗しました。", error);
        }
    };

    if (loading) return <Circular />;
    if (error) return <div className={styles.message}>{error}</div>;

    return (
        <div className={styles.Container}>
            <div className={styles.Button}>
            <Tooltip title="新規作成">
                <Box sx={{ '& > :not(style)': { m: 1 } }}>
                <Fab color="primary" aria-label="add" onClick={() => {setOpen(true)}}>
                    <AddIcon />
                </Fab>
                </Box>

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
            />
            <TaskList tasks={tasks} onToggleStatus={handleToggleStatus} />
        </div>
    );
}

