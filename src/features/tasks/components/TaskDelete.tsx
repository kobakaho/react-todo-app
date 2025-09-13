import { useNavigate } from "react-router-dom";
import { deleteTask } from "../api/deleteTask";
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
        const result = window.confirm("本当に削除しますか？");
        if (result) {
            await deleteTask(id);
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
