export type Priority = "high" | "medium" | "low";
// タスクの優先度

// タスクオブジェクト全体の方を定義
export interface Task {
    id: number;
    title: string;
    description: string;
    status: boolean; // true false
    priority: Priority; // リテラル型（特定の値を持つ型）
    // 意図しない値（例：high・medium・low以外の値）が入ることをコンパイル時に防ぐ
    dueDate: string;
    createdAt: string;
    updatedAt: string;
}