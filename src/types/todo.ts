import { Timestamp } from "firebase/firestore";

export interface Todo {
  id: string;
  title: string;
  status: boolean;
  order?: number; // 並び順を管理する
  createdAt: Timestamp;
  updateAt: Timestamp;
}

export type TodoFormData = Omit<Todo, "id" | "createdAt" | "updateAt">;
