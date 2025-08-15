import { Task, TaskFormData } from "../../../types/task";
import { mockTasks } from "../mocks/task";

// createTask関数　タスク作成フォームから送信されたデータを受け取り、新しいタスクを作成してモックデータに追加する
// 引数は、タスク作成フォームで入力されたデータを受け取るためのもの
// TaskFormData 型として定義
// title、description、priorityなど、必要なプロパティが漏れなく含まれていることが保証される
export const createTask = (taskData: TaskFormData): Promise<Task> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const newTask: Task = {
                ...taskData,
                id: mockTasks.length + 1, // 新しいタスクのIDは、モックデータのタスク数に1を加えた値
                createdAt: new Date().toDateString(), // 新しいタスクの作成日時を表す値
                updatedAt: new Date().toDateString(), // 新しいタスクの更新日時を表す値
                status: false, // 新しいタスクのステータスを表す値新　規作成時は未完了
            };
            mockTasks.push(newTask);
            resolve(newTask);
        }, 500);
    });
};
// 