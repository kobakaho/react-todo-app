import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTaskById } from "../api/Task/getTaskById";
import { Task } from "../../../types/task";

import TaskDetail from "../components/TaskDetail";
import Circular from "../../../shared/components/Circular"

export default function TaskDetailContainer() {
  const { id } = useParams<{ id: string }>();  // URLパラメータからタスクIDを取得
  const [task, setTask] = useState<Task | null>(null);
  // task の状態　まだ取得できていない間は null →　取得後に Task 型のデータで更新
  //「task は null か Task のどちらかの型である」と明確に定義　→　コードの安全性を高めている
  const navigate = useNavigate();

  // useEffect コンポーネントがマウントされた時にgetTaskById関数を実行してタスク情報を取得
  // getTaskById関数に、URLパラメータから取得したタスクIDを引数に渡すことで、指定されたタスクの情報を取得できる
  useEffect(() => {
    const unsubscribe = getTaskById(id!, (task) => {
      if (task) {
      setTask(task);
    } else {
      navigate("/tasks");
      console.log("タスクが見つかりませんでした。");
    }
    });
    return () => unsubscribe();
  }, [id, navigate]);

  if (!task) {
    return <Circular />;
  }

  return (
    <TaskDetail task={task} />
  );
}