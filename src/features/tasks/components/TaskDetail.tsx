import { useState } from "react";
import { Link } from "react-router-dom";
import { getPriorityClass } from "../utils/priority";
import { Task } from "../../../types/task";
import TodoDetail from "../containers/TodoDetailContainer"
import TaskDeleteButton from "../components/TaskDelete";
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import TaskEditFormContainer from "../containers/TaskEditFormContainer";
import Tooltip from '@mui/material/Tooltip';
import Switch from "@mui/material/Switch";
import styles from "../styles/taskDetail.module.css";

type Props = {
    task: Task;
};

export default function TaskDetail({ task }: Props) {
    const [open, setOpen] = useState(false);
    const [forceShow, setForceShow] = useState(false);

    const isToday = task.dueDate === new Date().toISOString().split('T')[0];

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
            <div className={styles.switch}>
            {isToday && (
                <Tooltip  title={forceShow ? "サブタスクを隠す" : "サブタスクを表示"} placement="top">
                    <Switch
                        checked={forceShow}
                        onChange={(e) => setForceShow(e.target.checked)}
                    />
                </Tooltip>
            )}
            </div>
        </div>
        { forceShow || !isToday ? (
            <TodoDetail />
        ) : (
            <div className={styles.todo} >
                期限日が今日のタスクは、サブタスクが表示されません。
            </div>
        )}
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
                    <Fab color="secondary" aria-label="add" onClick={() => {setOpen(true)}}>
                        <EditIcon />
                    </Fab>
                </Tooltip>
                <TaskEditFormContainer open={open} onClose={() => {setOpen(false)}} id={task.id} />
            </div>
        </div>
    </div>
    );
}