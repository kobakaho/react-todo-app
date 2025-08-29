import React, { useState } from 'react';
import styles from "../../styles/auth.module.css";
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase'; // authインスタンスをインポート
import { useNavigate } from 'react-router-dom';

const ResetPassword: React.FC = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleForgotPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        if (!email) {
            setError('メールアドレスを入力してください。');
            return;
        }
        try {
            await sendPasswordResetEmail(auth, email);
            setSuccessMessage('パスワード再設定用のメールを送信しました。');
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
        <form onSubmit={handleForgotPassword} className={styles.form}>
            {successMessage && <p className={styles.success}>{successMessage}</p>}
            {error && <p className={styles.error}>{error}</p>}

            <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>メールアドレス:</label>
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
        <button type="button" onClick={() => navigate("/signin")} className={styles.linkButton}>ログイン画面に戻る</button>
        </div>
    );
};

export default ResetPassword;