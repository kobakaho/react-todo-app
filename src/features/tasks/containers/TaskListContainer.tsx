import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { getTasks } from "../api/getTasks";
import { updateTask } from "../api/updateTask";
import { Task } from "../../../types/task";
import TaskList from "../components/TaskList";
import styles from "../styles/TaskListContainer.module.css";
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';


export default function TaskListContainer() {
    const [todayTasks, setTodayTasks] = useState<Task[]>([]);
    const [pastTasks, setPastTasks] = useState<Task[]>([]);
    const [upcomingTasks, setUpcomingTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchAndCategorizeTasks = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const allTasks = await getTasks();

            const today = new Date();
            const yyyy = today.getFullYear();
            const mm = String(today.getMonth() + 1).padStart(2, '0');
            const dd = String(today.getDate()).padStart(2, '0');
            const todayString = `${yyyy}-${mm}-${dd}`

            const todayList: Task[] = [];
            const pastList: Task[] = [];
            const upcomingList: Task[] = [];

            allTasks.forEach(task => {
                // 完了済みのタスクの処理
                
                // 期限がない、または期限が今日のタスク「今日やること」
                if (!task.dueDate || task.dueDate === todayString) {
                    todayList.push(task);
                    // 期限が今日以前のタスク「過去のタスク」
                } else if (task.dueDate < todayString) { 
                    pastList.push(task);
                } else { 
                    // 期限が明日以降のタスク「今後のタスク」
                    upcomingList.push(task);
                }
            });

            setTodayTasks(todayList);
            setPastTasks(pastList);
            setUpcomingTasks(upcomingList);
        } catch (err) {
            setError("タスクの読み込みに失敗しました。");
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchAndCategorizeTasks();
    }, [fetchAndCategorizeTasks]);

    const handleToggleStatus = async (taskId: Task['id'], newStatus: boolean) => {
        try {
            await updateTask(String(taskId), { status: newStatus });
            // 状態更新が成功したら、リストを再読み込みして分類し直す
            await fetchAndCategorizeTasks();
        } catch (error) {
            setError("タスクの更新に失敗しました。");
            console.error("タスクの更新に失敗しました。", error);
        }
    };

    if (loading) return <div className={styles.message}>読み込み中...</div>;
    if (error) return <div className={styles.message}>{error}</div>;

    return (
        <div className={styles.Container}>
            {/*<div className={styles.headerContainer}>*/}
                <Link to="/tasks/new">
                    <Box sx={{ '& > :not(style)': { m: 1 } }}>
                    <Fab color="primary" aria-label="add">
                        <AddIcon />
                    </Fab>
                    </Box>
                </Link>
            {/*</div>*/}

            <div>
                {pastTasks.length > 0 ? (
                    <TaskList tasks={pastTasks} onToggleStatus={handleToggleStatus} />
                ) : (
                    <p className={styles.emptyMessage}>過去のタスクはありません。</p>
                )}
            </div>
            <div>
                {/*<h2 className={styles.sectionHeader}>今日やること</h2>*/}
                {todayTasks.length > 0 ? (
                    <TaskList tasks={todayTasks} onToggleStatus={handleToggleStatus} />
                ) : (
                    <p className={styles.emptyMessage}>今日やるタスクはありません。</p>
                )}
            </div>

            <div>
                {/*<h2 className={styles.sectionHeader}>今後のタスク</h2>*/}
                {upcomingTasks.length > 0 ? (
                    <TaskList tasks={upcomingTasks} onToggleStatus={handleToggleStatus} />
                ) : (
                    <p className={styles.emptyMessage}>今後のタスクはありません。</p>
                )}
            </div>
        </div>
    );
}
