import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTask } from "../api/Task/createTask";
import { TaskFormData } from "../../../types/task";
import TaskForm from "../components/TaskForm";
import Button from '@mui/material/Button';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";


export default function TaskFormContainer({
    open,
    onClose,
}: {
    open: boolean;
    onClose: () => void;
}) {
    const initialFormData: TaskFormData = {
        title: "",
        description: "",
        priority: "medium",
        dueDate: "",
        archived: false,
        status: false
    };

// const { id } = useParams<{ id?: string }>(); //新規作成時はidは不要
// TaskFormContainerコンポーネント タスク作成フォームの状態を管理　
// 入力ミス・ズレを防ぐ

    const [formData, setFormData] = useState<TaskFormData>(initialFormData); // 初期値

    // 各フォーム要素の変更時に呼ばれ、formDataを更新
    // priorityは、Priorityという文字列リテラル型に変換する必要がある
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };
    const navigate = useNavigate();


    // フォームが送信された際に、createTask関数を実行して新しいタスクを作成し、タスク一覧ページにリダイレクトする処理
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await createTask(formData);
        alert("タスクが作成されました");
        setFormData(initialFormData);
        navigate("/tasks");
        onClose();
    };

    return (
        <div>
            <Dialog open={open} onClose={onClose}>
            <DialogActions>
                <Button onClick={onClose}>キャンセル</Button>
            </DialogActions>
            <DialogContent>
            <TaskForm
                formData={formData}
                onChange={handleChange}
                onSubmit={handleSubmit}
            />
            </DialogContent>
            </Dialog>
        </div>
    );
}