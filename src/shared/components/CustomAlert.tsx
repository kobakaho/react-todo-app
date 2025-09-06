import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

type Props = {
    type?: "success" | "info" | "warning" | "error";
    message?: string;
}

const CustomAlerts: React.FC<Props> = ({ type, message }) => {
  const [open, setOpen] = useState(!!(type && message));
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // 1. location.stateにメッセージがある場合、それを表示対象とする
    if (location.state?.message) {
      setOpen(true);
      // 2. 表示後、stateをクリアしてリロードで再表示されるのを防ぐ
      // navigateの第二引数で state を null にして履歴を置き換える
      navigate(location.pathname, { state: null, replace: true });
    } else if (type && message) {
      // 3. propsとして直接渡された場合も表示する
      setOpen(true);
    }
  }, [type, message, location.state, location.pathname, navigate]);

  useEffect(() => {
    // 4. アラートが表示された5秒後に自動で閉じるタイマー
    if (open) {
      const timer = setTimeout(() => {
        setOpen(false);
      }, 5000); // 5000ミリ秒 = 5秒

      // コンポーネントがアンマウントされる際にタイマーをクリア
      return () => clearTimeout(timer);
    }
  }, [open]);

  if (!open || !type || !message) {
    return null;
  }

  return (
    <Stack sx={{ width: '100%', marginTop: 1 }} spacing={2}>
      <Alert severity={type} onClose={() => setOpen(false)}>{message}</Alert>
    </Stack>
  );
}

export default CustomAlerts;

