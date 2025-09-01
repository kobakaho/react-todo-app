import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../../../firebase";
import { TaskFormData } from "../../../types/task"

export const createTask = async (task: TaskFormData) => {
    const user = auth.currentUser;
    if (!user) {
        throw new Error("認証されていません。");
    }

    try {
    const docRef = await addDoc(collection(db, "tasks"), {
        ...task,
        userId: user.uid,
        createdAt: serverTimestamp(),
    });
    console.log("タスクの保存に成功しました ID: ", docRef.id);
    return docRef;
    } catch (error) {
    console.error("タスクの保存に失敗しました : ", error);
    throw error;
    }
}
