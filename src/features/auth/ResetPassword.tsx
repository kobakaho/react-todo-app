import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import Divider from '@mui/material/Divider';
import styles from "../../styles/auth.module.css";

const ResetPassword: React.FC = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();


    const handleForgotPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!email) {
            setError('メールアドレスを入力してください。');
            return;
        }
        try {
            await sendPasswordResetEmail(auth, email);
            alert('パスワード再設定用のメールを送信しました。迷惑メールに振り分けられる可能性があります。');
            navigate('/signin'); // ログイン成功後、マイページへリダイレクト
            } catch (err: any) {
            console.error('パスワード再設定エラー:', err);
            if (err.code === 'auth/user-not-found') {
                setError("このメールアドレスは存在しません")
            } else if (err.code === 'auth/invalid-email') {
                setError('無効なメールアドレスです。');
            } else {
                setError('メール送信に失敗しました。もう一度お試しください。');
            }
        }
    };

    return (
        <div className={styles.container}>
        <h2 className={styles.title}>パスワードリセット</h2>
        <Divider variant="middle" sx={{ mb: 2, mt: 2 }} />
        <form onSubmit={handleForgotPassword}>
            {error && <p className={styles.error}>{error}</p>}

            <label htmlFor="email" className={styles.label}>メールアドレス:</label>
            <div className={styles.formGroup}>
                <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
                required
            />
            </div>
            <button type="submit" className={styles.button}>メール送信</button>
        </form>
        <div className={styles.link}>
            <Link to="/signin">ログイン画面に戻る</Link>
        </div>
        </div>
    );
};

export default ResetPassword;