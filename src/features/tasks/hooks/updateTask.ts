import { Task, TaskFormData } from "../../../types/task";
import { mockTasks } from "../mocks/task";

// idをstring | numberにすることもできますが型を広くしすぎるとデメリットあり
// 呼び出し側で number や string の区別が曖昧になる
// 内部で typeof や String() を毎回確認・変換する必要が出てくる
// 型安全性を損なう可能性がある

// updateTask関数を部分更新できるよう、Partialを使って柔軟にする
// Partial は T のすべてのプロパティを「任意（optional）」にする
// TaskFormData が { title: string; description: string; status: boolean; } の場合、
// Partial は { title?: string; description?: string; status?: boolean; } のようになる
// Partial を使うことで、すべての項目を送信する必要はなく、変更したいフィールドだけを送れる
export const updateTask = (id: string, taskData: Partial<TaskFormData>): Promise<Task | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = mockTasks.findIndex((task) => task.id === Number.parseInt(id));
      if (index !== -1) {
        mockTasks[index] = {
          ...mockTasks[index],
          ...taskData,
          updatedAt: new Date().toISOString(),
        };
        resolve(mockTasks[index]);
      } else {
        resolve(null);
      }
    }, 500);
  });
};

