import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getTaskById } from "../api/Task/getTaskById";
import { updateTask } from "../api/Task/updateTask";
import { Priority, TaskFormData } from "../../../types/task";
import { toast } from 'react-toastify';
import Circular from "../../../shared/components/Circular"
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from '@mui/material/Button';
import TaskForm from "../components/TaskForm";

// TaskEditFormContainerコンポーネント タスク編集フォームの状態管理と送信処理を担当
export default function TaskEditFormContainer({
  open,
  onClose,
  id,
}: {
  open: boolean;
  onClose: () => void;
  id: string;
}) {

  // useParamsフックを使用して、URLパラメータからタスクIDを取得
  // useParams<{ id?: string }>() のように TypeScriptのジェネリクスを使って型注釈を行うことで
  // idがstring型であること（あるいは存在しない可能性）を明示
  // これにより、型安全なコーディングが可能になる
  //const { id } = useParams<{ id?: string }>(); 編集時にはidが必要なためidを渡す
  const [ formData, setFormData ] = useState<TaskFormData | null>(null);
  const navigate = useNavigate();

  // useEffectフックを使用
  // コンポーネントがマウントされた際に、getTaskById関数を使用して指定されたIDのタスクデータを取得
  // formDataステートに設定
  useEffect(() => {
    const unsubscribe = getTaskById(id!, (task) => {
      if (task) {
        setFormData({
          title: task.title,
          description: task.description,
          priority: task.priority,
          dueDate: task.dueDate,
          status: task.status,
          archived: task.archived
        });
      }
    });
    return () => unsubscribe();
  }, [id]);

  if (!formData) {
    return <Circular />
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
        return { ...prev, [name]: name === "priority" ? (value as Priority) : value };
      }
      return null;
    });
  }

  // handleSubmit関数
  // フォームが送信された際に、updateTask関数を実行してタスク情報を更新し、タスク詳細ページにリダイレクト
  // ここでも id の存在チェックや formData の型チェック→TypeScriptによるバグ防止の効果が発揮されます
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (!id) return;
    e.preventDefault();
      await updateTask(id, formData);
      toast.success("タスクが更新されました");
      navigate(`/tasks/${id}`);
      onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogActions>
          <Button onClick={onClose}>キャンセル</Button>
      </DialogActions>
      <DialogContent>
      <TaskForm
          formData={formData}
          onChange={handleChange}
          onSubmit={handleSubmit}
          id={id}
      />
      </DialogContent>
    </Dialog>
  );
}