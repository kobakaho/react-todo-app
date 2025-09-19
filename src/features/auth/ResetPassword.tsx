import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import { toast } from 'react-toastify';
import Divider from '@mui/material/Divider';
import styles from "../../styles/auth.module.css";

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await sendPasswordResetEmail(auth, email);
      toast.success('パスワード再設定用のメールを送信しました。迷惑メールに振り分けられる可能性があります。');
      navigate('/signin');
      } catch (err: any) {
      if (err.code === 'auth/user-not-found') {
        toast.error("このメールアドレスは存在しません")
      } else if (err.code === 'auth/invalid-email') {
        toast.error('無効なメールアドレスです。');
      } else {
        toast.error('メール送信に失敗しました。もう一度お試しください。');
      }
    }
  };

  return (
    <div className={styles.container}>
    <h2 className={styles.title}>パスワードリセット</h2>
    <Divider variant="middle" sx={{ mb: 2, mt: 2 }} />
    <form onSubmit={handleForgotPassword}>

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

