import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import styles from './Header.module.css';

export default function Header() {
    const navigate = useNavigate();

    return (
        <header className={styles.header}>
            <h1 className={styles.logo}>
                <Link to="/">タスク管理アプリ</Link>
            </h1>
            <Stack spacing={2} direction="row">
                <Button variant="contained" onClick={() => navigate("/signup")}>新規登録</Button>
                <Button variant="outlined"  onClick={() => navigate("/signin")}>ログイン</Button>
            </Stack>
        </header>
    );
}
