import { Task } from "../../../types/task";

type DueDateFilter = "past" | "today" | "upcoming";

type Props = {
  priority?: string;
  dueDate?: DueDateFilter;
};

export const applyFilter = (tasks: Task[], filter: Props): Task[] => {
  let filteredTasks = tasks;

  if (filter.priority) {
    filteredTasks = filteredTasks.filter(task => task.priority === filter.priority);
  }

  if (filter.dueDate) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    filteredTasks = filteredTasks.filter(task => {
    if (!task.dueDate) return filter.dueDate === "today"; // 期限日なしは "今日" 扱い

    const dueDate = new Date(task.dueDate);
    dueDate.setHours(0, 0, 0, 0);

    if (filter.dueDate === "past") {
      return dueDate.getTime() < today.getTime();
    }
    if (filter.dueDate === "today") {
      return dueDate.getTime() === today.getTime();
    }
    if (filter.dueDate === "upcoming") {
      return dueDate.getTime() > today.getTime();
    }
    return true;
    });
  }
  return filteredTasks;
};

export const sortTasks = (
  tasks: Task[],
  key: "createdAt" | "dueDate",
  order: "asc" | "desc"):
  Task[] => {
  return [...tasks].sort((a, b) => {
    const getTime = (tasks: Task) => {
      if (key === "createdAt") {
        return tasks.createdAt?.toDate().getTime() || 0;
      } else {
        if (tasks.dueDate) {
          return new Date(tasks.dueDate).getTime();
        } else {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          return today.getTime();
        }
      }
    };
    const timeA = getTime(a);
    const timeB = getTime(b);
    return order === "asc" ? timeA - timeB : timeB - timeA;
  });
};

