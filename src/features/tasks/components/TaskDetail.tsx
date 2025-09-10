import { useState } from "react";
import { Link } from "react-router-dom";
import { getPriorityClass } from "../utils/priority";
import { Task } from "../../../types/task";
import TaskDeleteButton from "../components/TaskDelete";
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import TaskEditFormContainer from "../containers/TaskEditFormContainer";
import Tooltip from '@mui/material/Tooltip';
import styles from "../styles/taskDetail.module.css";

type Props = {
    task: Task;
};

export default function TaskDetail({ task }: Props) {
    const [open, setOpen] = useState(false);

    return (
    <div className={styles.container}>
        <div className={styles.backButton}>
            <Tooltip title="戻る">
                <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                    <Link to="/tasks">
                        <IconButton aria-label="delete" size="large">
                            <ClearIcon fontSize="inherit" />
                        </IconButton>
                    </Link>
                </Stack>
            </Tooltip>
        </div>
        <h1 className={styles.title}>{task.title}</h1>
        <p className={styles.description}>{task.description}</p>
        <div className={styles.info}>
            優先度 :{" "}
            <span className={`${styles.badge} ${getPriorityClass(task.priority, styles)}`}>
            {task.priority}
            </span>
            期限日 :
            <Chip
                variant="outlined"
                color="success"
                label={`～ ${task.dueDate ? task.dueDate : "今日"}`}
                className={styles.badge}
            />
        </div>
        期限が指定されてたらTodo出す

        <div className={styles.infoRow}>
            <div className={styles.leftGroup}>
                <Chip
                    disabled
                    size="small"
                    label={
                        <div>作成日: {task.createdAt ? task.createdAt.toDate().toLocaleString() : ""}</div>
                    }
                />
                <Chip
                    disabled
                    size="small"
                    label={
                        <div>更新日: {task.updateAt ? task.updateAt.toDate().toLocaleString() : ""}</div>
                    }
                />
            </div>
            <div className={styles.rightGroup}>
                <TaskDeleteButton id={task.id.toString()} />

                <Tooltip title="更新する">
                    <Box sx={{ '& > :not(style)': { m: 1 } }}>
                    <Fab color="secondary" aria-label="add" onClick={() => {setOpen(true)}}>
                        <EditIcon />
                    </Fab>
                    </Box>
                </Tooltip>
                <TaskEditFormContainer open={open} onClose={() => {setOpen(false)}} id={task.id} />
            </div>
        </div>
    </div>
    );
}