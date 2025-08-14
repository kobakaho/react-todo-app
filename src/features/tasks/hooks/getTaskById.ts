import { Task } from "../../../types/task";
import { mockTasks } from "../mocks/task";

export const getTaskById = (id?: string): Promise<Task | undefined> => {
    if(!id) return Promise.resolve(undefined);
    return new Promise((resolve) => {
        setTimeout(() => {
            const task = mockTasks.find((task) => task.id === Number.parseInt(id));
            resolve(task);
        }, 500); 
    });
};

// getTaskById関数　指定されたタスクIDのタスク情報を取得する
// 引数で受け取っているid URLパラメータから取得したタスクID
// 関数を使用するコンポーネントでURLパラメータから取得したタスクIDを複数に渡して使う
// 関数の戻り値として Promise<Task | undefined> を指定
// 非同期にTask型のデータor該当するタスクがない場合はundefinedを返す