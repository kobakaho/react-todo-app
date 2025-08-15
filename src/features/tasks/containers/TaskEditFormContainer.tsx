import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TaskForm from "../components/TaskForm";
import { mockTasks } from "../mocks/task";
import { TaskFormData, Task } from "../../../types/task";
import styles from "../styles/taskForm.module.css";

export default function TaskEditFormContainer() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const taskId = Number(id);

  const [formData, setFormData] = useState<TaskFormData>({
    title: "",
    description: "",
    priority: "medium",
    dueDate: "",
  });

  useEffect(() => {
    const task = mockTasks.find((t) => t.id === taskId);
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        priority: task.priority,
        dueDate: task.dueDate,
      });
    }
  }, [taskId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const idx = mockTasks.findIndex((t) => t.id === taskId);
    if (idx !== -1) {
      mockTasks[idx] = {
        ...mockTasks[idx],
        ...formData,
        updatedAt: new Date().toISOString(),
      } as Task;
      navigate(`/tasks/${taskId}`);
    }
  };

  return (
    <div className={styles.container}>
      <h1>タスク編集</h1>
      <TaskForm formData={formData} onChange={handleChange} onSubmit={handleSubmit} />
      <div className={styles.cancelContainer}>
        <button className={styles.cancelLink} onClick={() => navigate(-1)}>
          前の画面に戻る
        </button>
      </div>
    </div>
  );
}