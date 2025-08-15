import { useNavigate } from "react-router-dom";
import { deleteTask } from "../hooks/deleteTask";
import styles from "../styles/taskDetail.module.css";

type props = {
    id? : string
}
export default function TaskDeleteButton({ id }: props) {
    const navigate = useNavigate(); // タスク一覧ページにリダイレクトするため

    // handleClick関数
    // 削除ボタンがクリックされた際に、確認ダイアログを表示
    // OKを押すとdeleteTask関数を実行して指定されたタスクを削除し、
    // タスク一覧ページにリダイレクトする処理
    const handleClick = async () => {
        if (!id) return
        const result = window.confirm("本当に削除しますか？");
        if (result) {
            await deleteTask(id);
            navigate("/tasks");
        }
    };

    return (
        <button className={styles.taskDeleteBtn} onClick={handleClick}>
            タスクを削除
        </button>
    );
}
