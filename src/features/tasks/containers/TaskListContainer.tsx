import { useState, useEffect, useCallback } from "react";
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
import styles from "../styles/TaskListContainer.module.css";
import TaskFormContainer from "./TaskFormContainer";

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
    const fetchTasks = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            let allTasks = await getTasks();
            allTasks = applyFilter(allTasks, filter);
            allTasks = sortTasks(allTasks, sortKey, sortOrder);
            setTasks(allTasks);

        } catch (err) {
            setError("タスクの作成に失敗しました。");
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [filter, sortKey, sortOrder]);

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    const handleToggleStatus = async (taskId: Task['id'], newStatus: boolean) => {
        try {
            await updateTask(String(taskId), { status: newStatus });
            // 状態更新が成功したら、リストを再読み込みして分類し直す
            await fetchTasks();
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
                <Box sx={{ '& > :not(style)': { m: 1 } }}>
                <Fab color="primary" aria-label="add" onClick={() => {setOpen(true)}}>
                    <AddIcon />
                </Fab>
                </Box>
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
