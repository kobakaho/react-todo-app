import { Task, TaskFormData } from "../../../types/task";
import { mockTasks } from "../mocks/task";

export const updateTask = (id: string, taskData: TaskFormData): Promise<Task | null> => {
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

