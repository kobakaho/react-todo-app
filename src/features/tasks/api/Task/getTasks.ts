import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db, auth } from "../../../../firebase";
import { Task } from "../../../../types/task";

export const getTasks = (callback: (tasks: Task[]) => void) => {
    const user = auth.currentUser;
    if (!user) {
        throw new Error("認証されていません。");
    }

    const q = query(collection(db, "tasks"), where("userId", "==", user.uid));
        return onSnapshot(q, (querySnapshot) => {
            const tasks: Task[] = [];
            querySnapshot.forEach((doc) => {
                tasks.push({
                    id: doc.id,
                    ...doc.data(),} as Task);
            });
        callback(tasks);;
    });
};
