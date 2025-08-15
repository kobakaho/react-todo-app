import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import TaskForm from "../components/TaskForm";
import { getTaskById } from "../hooks/getTaskById";
import { updateTask } from "../hooks/updateTask";
import styles from "../styles/taskForm.module.css";
import { Priority, TaskFormData } from "../../../types/task";

// TaskEditFormContainerコンポーネント タスク編集フォームの状態管理と送信処理を担当
export default function TaskEditFormContainer() {

  // useParamsフックを使用して、URLパラメータからタスクIDを取得
  // useParams<{ id?: string }>() のように TypeScriptのジェネリクスを使って型注釈を行うことで
  // idがstring型であること（あるいは存在しない可能性）を明示
  // これにより、型安全なコーディングが可能になる
  const { id } = useParams<{ id?: string }>(); //編集時にはidが必要なためidを渡す
  const [ formData, setFormData ] = useState<TaskFormData | null>(null);
  const navigate = useNavigate();

  // useEffectフックを使用
  // コンポーネントがマウントされた際に、getTaskById関数を使用して指定されたIDのタスクデータを取得
  // formDataステートに設定
  useEffect(() => {
    async function fetchTask() {
      const task = await getTaskById(id);
      if (task) {
          setFormData({
            title: task.title,
            description: task.description,
            priority: task.priority,
            dueDate: task.dueDate,
          });
      }
    };
    fetchTask();
  }, [id]);

  if (!formData) {
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: "300px" }}>
        読み込み中...
      </div>
    );
  }

  // handleChange関数
  // フォームの入力値が変更された際に、formDataステートを更新するための関数
  // TypeScriptによって、React.ChangeEventのジェネリック型を使って入力要素の種類（input, textarea, select）をカバー
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      if (prev) {
        return { ...prev, [name]: value };
      }
      return {
        ...prev,
        [name]: name === "priority" ? (value as Priority) : value,
      };
    });
  }
  // handleSubmit関数
  // フォームが送信された際に、updateTask関数を実行してタスク情報を更新し、タスク詳細ページにリダイレクト
  // ここでも id の存在チェックや formData の型チェック→TypeScriptによるバグ防止の効果が発揮されます
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (!id) return;
    e.preventDefault();
      await updateTask(id, formData);
      navigate(`/tasks/${id}`);
  };


  return (
    <div className={styles.container}>
      <h1>タスク編集</h1>
      <TaskForm 
        formData={formData} 
        onChange={handleChange} 
        onSubmit={handleSubmit}
        id={id}
      />
      <div className={styles.cancelContainer}>
        <Link to={`/tasks/${id}`} className={styles.cancelLink}>
          前の画面に戻る
        </Link>
      </div>
    </div>
  );
}