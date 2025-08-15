import { Link } from 'react-router-dom';
import styles from './Header.module.css';

export default function Header() {
    return (
        <header className={styles.header}>
            <h1 className={styles.logo}>
                <Link to="/">タスク管理アプリ</Link>
            </h1>
            <nav className={styles.nav}>
                <ul className={styles.navList}>
                    <li>
                        <Link to="/tasks/new">新規作成</Link>
                    </li>
                    <li>
                        <Link to="/tasks">タスク一覧</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
