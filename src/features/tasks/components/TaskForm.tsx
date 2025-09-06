import { TaskFormData } from "../../../types/task";
import DoneIcon from '@mui/icons-material/Done';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import styles from "../styles/taskForm.module.css";

// props コンポーネント間でデータや関数をやり取りすることができる
type Props = {
    formData: TaskFormData; 
    // フォームデータをTaskForm型で受け取る 
    // タスク作成フォームの入力状態を保持する
    onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => void; 
    // 入力が変更されたときに呼ばれる関数
    // ユーザーの入力内容をformDataに反映させる
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void; 
    // フォームが送信されたときに呼ばれる関数
    // 登録処理などを実行する
    id?: string;
    // ? は id プロパティは必須ではない id が存在してもなくても良い
};
const priority = [
    {
        value: "low",
        label: "低",
    },
    {
        value: "medium",
        label: "中",
    },
    {
        value: "high",
        label: "高",
    },
];

// TaskFormコンポーネント タスク作成フォームを表示
export default function TaskForm({ formData, onChange, onSubmit, id }: Props) {
    return (

        <form onSubmit={onSubmit}>
            <div className={styles.formGroup}>
                <label>タイトル:</label>
                <TextField
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={onChange}
                    required
                />{/* required　必須項目にする */}
            </div>
            <div className={styles.formGroup}>
                <label>説明:</label>
                <TextField
                    type="text"
                    name="description"
                    value={formData.description}
                    multiline
                    rows={3}
                    onChange={onChange}
                />
            </div>
            <div className={styles.formGroup}>
                <label>優先度:</label>
                <TextField
                    name="priority"
                    value={formData.priority}
                    onChange={onChange}
                    select
                >
                {priority.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
                </TextField>
            </div>
            <div className={styles.formGroup}>
                <label>期限日:</label>
                <TextField
                    type="date"
                    name="dueDate"
                    value={formData.dueDate || ""}
                    onChange={onChange}
                />
            </div>
            <div className={styles.Button}>
                <Tooltip title={id ? "更新する" : "登録する"}>
                {id ? (
                <Box sx={{ '& > :not(style)': { m: 1 } }}>
                    <Fab color="secondary" aria-label="edit" type="submit">
                        <DoneIcon />
                    </Fab>
                </Box>
                ) : (
                <Box sx={{ '& > :not(style)': { m: 1 } }}>
                    <Fab color="primary" aria-label="edit" type="submit">
                        <DoneIcon />
                    </Fab>
                </Box>)}

                    </Tooltip>
            </div>
        </form>
    );
}