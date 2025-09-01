import { collection, getDocs, query, where } from "firebase/firestore";
import { db, auth } from "../../../firebase";
import { Task } from "../../../types/task";

export const getTasks = async (): Promise<Task[]> => {
    const user = auth.currentUser;
    if (!user) {
        throw new Error("認証されていません。");
    }

    const q = query(collection(db, "tasks"), where("userId", "==", user.uid));
    const querySnapshot = await getDocs(q);
    const tasks: Task[] = [];
    querySnapshot.forEach((doc) => {
        tasks.push(doc.data() as Task);
    });
    return tasks;
};
