import { useNavigate } from "react-router-dom";
import { deleteTask } from "../api/Task/deleteTask";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";
import { toast } from 'react-toastify';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';

type props = {
  id? : string
}
export default function TaskDeleteButton({ id }: props) {
  const navigate = useNavigate(); // タスク一覧ページにリダイレクトするため

  // handleClick関数
  // 削除ボタンがクリックされた際に、確認ダイアログを表示
  // OKを押すとdeleteTask関数を実行して指定されたタスクを削除し、
  // タスク一覧ページにリダイレクトする処理
  const handleClick = async () => {
    if (!id) return
    const todoSnapshot = await getDocs(collection(db, "tasks", id, "todos"));
    const msg = todoSnapshot.empty
      ? "本当に削除しますか？"
      : "本当に削除しますか？サブタスクも削除されます。";
    const result = window.confirm(msg);
    if (result) {
      await deleteTask(id);
      toast.success("タスクが削除されました");
      navigate("/tasks");
    }
  };

  return (
    <Tooltip title="削除する">
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }} onClick={handleClick}>
        <IconButton aria-label="delete" size="large">
          <DeleteIcon fontSize="inherit" />
        </IconButton>
      </Stack>
    </Tooltip>
  );
}
