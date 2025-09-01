import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import SettingsIcon from '@mui/icons-material/Settings';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';


export default function AuthHeader() {
    const navigate = useNavigate();

    return (
        <header className={styles.header}>
            <h1 className={styles.logo}>
                <Link to="/">タスク管理アプリ</Link>
            </h1>
            <nav className={styles.nav}>
                <ul className={styles.navList}>
                <IconButton size="large" onClick={() => navigate("/mypage")}>
                    <SettingsIcon>
                        <SettingsIcon />
                    </SettingsIcon>
                </IconButton>
                </ul>
            </nav>
        </header>
    );
}
