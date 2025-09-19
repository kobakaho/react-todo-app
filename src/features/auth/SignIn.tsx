import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase'; // authインスタンスをインポート
import { toast } from 'react-toastify';
import Divider from '@mui/material/Divider';
import styles from "../../styles/auth.module.css";

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/tasks');
      toast.success('ログインしました！');
    } catch (err: any) {
      console.log(err);
      if (
        err.code === 'auth/user-not-found' ||
        err.code === 'auth/wrong-password' ||
        err.code === 'auth/invalid-credential'
      ) {
        toast.error('メールアドレスまたはパスワードが間違っています。');
      } else if (err.code === 'auth/too-many-requests') {
        toast.error('リクエストが多すぎます。しばらく待ってから再試行してください。');
      } else {
        toast.error('サインインに失敗しました。もう一度お試しください。');
      }
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>ログイン</h2>
      <Divider variant="middle" sx={{ mb: 2, mt: 2 }} />

      <form onSubmit={handleSignIn}>
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
        <button type="submit" className={styles.button}>ログイン</button>
      </form>
      <Link to="/signup" className={styles.linkButton}>新規登録</Link>
      <div className={styles.link}>
      <Link to="/resetpassword">パスワードをお忘れの方はこちら</Link>
      </div>

    </div>
  );
};


