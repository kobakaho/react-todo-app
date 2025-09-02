import { collection, query, where, getDocs, writeBatch } from "firebase/firestore";
import { db } from "../../../firebase";

export const deleteUserTasks = async (userId: string): Promise<void> => {
  try {
    const tasksCollectionRef = collection(db, "tasks");
    // 削除対象ユーザーのタスクをすべて取得するクエリ
    const q = query(tasksCollectionRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      // ユーザーにタスクがない場合は何もしない
      return;
    }

    // writeBatch 一括書き込み
    // バッチ処理で複数のドキュメントを一度に削除
    const batch = writeBatch(db);
    querySnapshot.forEach((document) => {
      batch.delete(document.ref);
    });

    await batch.commit();
  } catch (error) {
    console.error("タスクの一括削除中にエラーが発生しました:", error);
    throw error; // エラーを呼び出し元に再スロー
  }
};

