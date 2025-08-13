import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import { getTasks } from "../hooks/getTasks";
import { Task } from "../../../types/task";
import TaskCard from "../components/TaskCard";
import styles from "../styles/TaskListContainer.module.css";

// useEffect 副作用を実行するためのフック
// ややこし！テキスト！

// useState ユーザの入力やボタンのクリックによるデータの変化を管理するためのフック
// コンポーネントの状態（State）を管理する
//　通常の変数はコンポーネントが再レンダリングされるとリセットされるがこれ使うと値を保持できる

export default function TaskListContainer() {
    const [tasks, setTasks] = useState<Task[]>([]);
    // タスク一覧データを管理するためのstateを定義
    // 型を明示することで配列の中にTask型のデータしか入らないことが保証される

    useEffect(() => {
        const fetchTasks = async () => {
            const fetchedTasks = await getTasks();
            setTasks(fetchedTasks);
        };
        fetchTasks();
    }, []);
    // useEffectフックを使ってコンポーネントのマウント時にgetTasks関数を実行してタスク一覧データを取得
    // getTasks関数で取得したデータをsetTasks関数でstateにセット

    return (
        <div className={styles.container}>
            <h1>タスク一覧</h1>
            <div className={styles.tableContainer}>
                <div className={styles.header}>
                    <div>タスク名</div>
                    <div>ステータス</div>
                    <div>優先度</div>
                    <div>期限日</div>            
                </div>
            <div className= {styles.taskList}>
              {tasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
        </div>
    </div>
 );
}

// tasks.map() メソッドを使ってタスク一覧データを一覧表示