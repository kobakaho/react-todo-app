import { Priority } from "../../../types/task";
  // タスクの優先度に応じたクラス名・スタイルを返す関数
  // Priority TSで定義した型
  export const getPriorityClass = (
  priority: Priority,
  styles: Record<string, string>
  ): string => {
  switch (priority.toLowerCase()) {
    case "high":
      return styles.highPriority
    case "medium":
      return styles.mediumPriority
    case "low":
      return styles.lowPriority
    default:
      return styles.defaultPriority
  }
};
