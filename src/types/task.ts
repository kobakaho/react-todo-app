export type Priority = "high" | "medium" | "low";
import { Timestamp } from "firebase/firestore";
// タスクの優先度

// タスクオブジェクト全体の方を定義
export interface Task {
    id: string; // firebase用に変更
    title: string;
    description: string;
    status: boolean; // true false
    priority: Priority; // リテラル型（特定の値を持つ型）
    // 意図しない値（例：high・medium・low以外の値）が入ることをコンパイル時に防ぐ
    dueDate: string;
    createdAt: Timestamp;
    updateAt: Timestamp;
}

// タスク作成・編集フォームのデータ型
// Omit<T, K> は TypeScript のユーティリティ型の一つ
// 指定した型 T から特定のプロパティ K を除外した新しい型を作成
// Omitを使うことで、Task型から不要なプロパティを除いた新しい型を簡単に作成できる 可読性UP
export type TaskFormData = Omit<Task, "id" | "createdAt" | "updatedAt">;

