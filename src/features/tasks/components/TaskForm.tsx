import { TaskFormData } from "../../../types/task";
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

// TaskFormコンポーネント タスク作成フォームを表示
export default function TaskForm({ formData, onChange, onSubmit, id }: Props) {
    return (
        <form onSubmit={onSubmit} className={styles.form}>
            <div className={styles.formGroup}>
                <label>タイトル:</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={onChange}
                    required
                />{/* required　必須項目にする */}
            </div>
            <div className={styles.formGroup}>
                <label>説明:</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={onChange}
                />
            </div>
            <div className={styles.formGroup}>
                <label>優先度:</label>
                <select
                    name="priority"
                    value={formData.priority}
                    onChange={onChange}
                >
                    <option value="low">低</option>
                    <option value="medium">中</option>
                    <option value="high">高</option>
                </select>
            </div>
            <div className={styles.formGroup}>
                <label>期限日:</label>
                <input
                    type="date"
                    name="dueDate"
                    value={formData.dueDate || ""}
                    onChange={onChange}
                />
            </div>
            <button type="submit" className={styles.submitButton}>
                {id ? "更新" : "作成"} {/* idが存在する場合は「更新する」、存在しない場合は「作成する」 */}
            </button>
        </form>
    );
}