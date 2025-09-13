import { collection, getDocs } from "firebase/firestore";
import { db, auth } from "../../../../firebase";
import { Todo } from "../../../../types/todo";

export const getTodos = async (taskId: string) => {
    const user = auth.currentUser;
    if (!user) {
        throw new Error("認証されていません。");
    }

    const q = await getDocs(collection(db, "tasks", taskId, "todos"));
        return q.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
    })) as Todo[];
}