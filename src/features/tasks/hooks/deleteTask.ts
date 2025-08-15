import { mockTasks } from "../../../features/tasks/mocks/task";

// deleteTask関数 指定されたidのタスクを削除する
// 関数の戻り値の型Promise 非同期処理の操作が完了したときに結果を返すもの
// 非同期処理の結果として、指定されたIDのタスクが存在する場合に true
// タスクが見つからない場合には false を返す
export const deleteTask = (id: string): Promise<boolean> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const index = mockTasks.findIndex((task) => task.id === Number.parseInt(id));
            if (index !== -1) {
                mockTasks.splice(index, 1); // タスクを削除
                resolve(true);
            } else {
                resolve(false);
            }
        }, 500);
    });
};