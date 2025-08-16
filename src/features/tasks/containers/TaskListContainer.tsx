import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTasks } from "../hooks/getTasks";
import { updateTask } from "../hooks/updateTask";
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
    const fetchTasks = async () => {
        const fetchedTasks = await getTasks();
        setTasks(fetchedTasks);
    };

    useEffect(() => {
        fetchTasks();
    }, []);
    // useEffectフックを使ってコンポーネントのマウント時にgetTasks関数を実行してタスク一覧データを取得
    // getTasks関数で取得したデータをsetTasks関数でstateにセット

    // handleToggleStatus関数
    // updateTask関数を使用して、指定されたIDのタスクのステータスを更新する関数
    const handleToggleStatus = async (taskId: Task['id'], newStatus: boolean) => {
        await updateTask(String(taskId), { status: newStatus });
        fetchTasks(); //タスクステータスが変更された後にfetchTasks関数を実行して、タスク一覧を再取得
    };
    // taskId: Task['id'] Task型に定義されているidと同じ型を使用する
    // ステータスはtrueまたはfalseのみを取るので、boolean型
    // タスクの id は number 型として定義
    // しかし、updateTask 関数の定義を見ると、id の型が string 型で受け取る
    // →updateTask 側が string を期待しているため、関数を呼び出す前に明示的に String() を使って型を合わせる

    return (
        <div className={styles.container}>
            <h1>タスク一覧</h1>
            <div className={styles.taskListHeader}>
                <Link to="/tasks/new" className={styles.newTaskLink}>
                新規作成
                </Link>
            </div>
            <div className={styles.tableContainer}>
                <div className={styles.header}>
                    <div>タスク名</div>
                    <div>ステータス</div>
                    <div>優先度</div>
                    <div>期限日</div>            
                </div>
            <div className= {styles.taskList}>
              {tasks.map((task) => (
                <TaskCard 
                  key={task.id} 
                  task={task} 
                  onToggleStatus={handleToggleStatus} // タスクのステータスを更新するための関数を渡す
              />
              ))}
            </div>
        </div>
    </div>
 );
}

// tasks.map() メソッドを使ってタスク一覧データを一覧表示