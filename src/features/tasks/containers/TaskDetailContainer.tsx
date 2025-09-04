import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTaskById } from "../api/getTaskById";
import { Task } from "../../../types/task";
import TaskDetail from "../components/TaskDetail";
import Circular from "../../../shared/components/Circular"

export default function TaskDetailContainer() {
    const { id } = useParams<{ id: string }>();
    // URLパラメータからタスクIDを取得
    const [task, setTask] = useState<Task | null>(null);
    // task の状態　まだ取得できていない間は null →　取得後に Task 型のデータで更新
    //「task は null か Task のどちらかの型である」と明確に定義　→　コードの安全性を高めている

    // useEffect コンポーネントがマウントされた時にgetTaskById関数を実行してタスク情報を取得
    // getTaskById関数に、URLパラメータから取得したタスクIDを引数に渡すことで、指定されたタスクの情報を取得できる
    useEffect(() => {
        if (!id) return;
        async function fetchTask() {
            try {
                const fetchedTask = await getTaskById(id!);
                setTask(fetchedTask ?? null);
            } catch (error) {
                console.error("Error fetching task:", error);
                setTask(null);
            }
        }
        fetchTask();
    }, [id]);
    // setTask(fetchedTask ?? null);
    // 取得されたタスクが undefined の場合もあるため、?? 演算子で null に置き換え、安全に扱えるようにしている

    if (!task) {
        return <Circular />
    }

    return (
        <TaskDetail task={task} /> 
    );
}
// タスク情報が取得できていない場合は、ローディング表示
        {/* 取得したタスク情報をTaskDetailコンポーネントに渡す */}

