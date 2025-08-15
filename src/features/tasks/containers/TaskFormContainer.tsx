import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import TaskForm from "../components/TaskForm";
import { createTask } from "../hooks/createTask";
import styles from "../styles/taskForm.module.css";
import { Priority, TaskFormData } from "../../../types/task";

// TaskFormContainerコンポーネント タスク作成フォームの状態を管理　
// 入力ミス・ズレを防ぐ
export default function TaskFormContainer() {
// const { id } = useParams<{ id?: string }>(); //新規作成時はidは不要

    const [formData, setFormData] = useState<TaskFormData>({
        title: "",
        description: "",
        priority: "medium",
        dueDate: "",
    }); // 初期値

    // タスク一覧ページにリダイレクトするためのnavigate関数を取得
    // タスク作成後にタスク一覧ページに遷移
    const navigate = useNavigate();

    // 各フォーム要素の変更時に呼ばれ、formDataを更新
    // priorityは、Priorityという文字列リテラル型に変換する必要がある
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // フォームが送信された際に、createTask関数を実行して新しいタスクを作成し、タスク一覧ページにリダイレクトする処理
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await createTask(formData);
        navigate("/tasks");
    };


    return (
        <div className={styles.container}>
            <h1>タスク作成</h1>
            <TaskForm 
                formData={formData}
                onChange={handleChange}
                onSubmit={handleSubmit}
            />
            <div className={styles.cancelContainer}>
                <Link to="/tasks" className={styles.cancelLink}>
                前の画面に戻る
                </Link>
            </div>
        </div>
    );
}