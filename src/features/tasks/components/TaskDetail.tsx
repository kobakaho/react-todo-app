import { Link } from "react-router-dom";
import styles from "../styles/taskDetail.module.css";
import { getPriorityClass } from "../utils/priority";
import { Task } from "../../../types/task";
import TaskDeleteButton from "../components/TaskDelete";

import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';

type Props = {
    task: Task;
};

export default function TaskDetail({ task }: Props) {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{task.title}</h1>
            <p className={styles.description}>{task.description}</p>
            <p className={styles.info}>
                優先度 :{" "}
                <span className={`${styles.badge} ${getPriorityClass(task.priority, styles)}`}> 
                {task.priority}
                </span>
            </p>
            <p className={styles.info}>期限日: {task.dueDate ? task.dueDate : "今日"}</p>
            <p className={styles.info}>
                作成日: {task.createdAt ? task.createdAt.toDate().toLocaleString() : ""}
            </p>
            <p className={styles.info}>
                更新日: {task.updateAt ? task.updateAt.toDate().toLocaleString() : ""}
            </p>
            <div className={styles.links}>
                <TaskDeleteButton id={task.id.toString()} />
                <Link to={`/tasks/${task.id}/edit`}>
                <Box sx={{ '& > :not(style)': { m: 1 } }}>
                <Fab color="secondary" aria-label="edit">
                    <EditIcon />
                </Fab>
                </Box>
                </Link>
                <Link to="/tasks" className={styles.backLink}>
                    戻る
                </Link>
            </div>
        </div>
    );
}