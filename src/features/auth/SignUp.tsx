import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../../firebase"; // authインスタンスをインポート
import { toast } from 'react-toastify';

import Divider from '@mui/material/Divider';
import styles from "../../styles/auth.module.css";

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success('アカウントを作成しました。ログインしてください。');
      navigate('/signin');
    } catch (err: any) {
      if (err.code === 'auth/email-already-in-use') {
        toast.error('このメールアドレスは既に使用されています。');
      } else if (err.code === 'auth/invalid-email') {
        toast.error('無効なメールアドレスです。');
      } else if (err.code === 'auth/weak-password') {
        toast.error('パスワードは6文字以上である必要があります。');
      } else {
        toast.error('サインアップに失敗しました。もう一度お試しください。');
      }
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>新規登録</h2>
      <Divider variant="middle" sx={{ mb: 2, mt: 2 }} />

      <form onSubmit={handleSignUp}>
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
        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.label}>パスワード:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <button type="submit" className={styles.button}>登録</button>
      </form>
      <div className={styles.link}>
      <Link to="/signin">ログインはこちら</Link>
      </div>
    </div>
  );
};


