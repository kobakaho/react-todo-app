import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../../firebase"; // authインスタンスをインポート
import Divider from '@mui/material/Divider';
import styles from "../../styles/auth.module.css";

const SignUp: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // エラーをリセット

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/signin');
      alert('アカウントを作成しました。ログインしてください。');
    } catch (err: any) {
      console.error('サインアップエラー:', err);
      // Firebaseのエラーコードに基づいてメッセージを調整
      if (err.code === 'auth/email-already-in-use') {
        setError('このメールアドレスは既に使用されています。');
      } else if (err.code === 'auth/invalid-email') {
        setError('無効なメールアドレスです。');
      } else if (err.code === 'auth/weak-password') {
        setError('パスワードは6文字以上である必要があります。');
      } else {
        setError('サインアップに失敗しました。もう一度お試しください。');
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
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit" className={styles.button}>登録</button>
      </form>
      <div className={styles.link}>
      <Link to="/signin">ログインはこちら</Link>
      </div>
    </div>
  );
};

export default SignUp;

