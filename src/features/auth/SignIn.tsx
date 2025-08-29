import React, { useState } from 'react';
import styles from "../../styles/auth.module.css";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase'; // authインスタンスをインポート
import { Link, useNavigate } from 'react-router-dom';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // エラーをリセット
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('ログインしました！');
      navigate('/mypage'); // ログイン成功後、マイページへリダイレクト
    } catch (err: any) {
      console.error('サインインエラー:', err);
      // Firebaseのエラーコードに基づいてメッセージを調整
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        setError('メールアドレスまたはパスワードが間違っています。');
      } else if (err.code === 'auth/invalid-email') {
        setError('無効なメールアドレスです。');
      } else {
        setError('サインインに失敗しました。もう一度お試しください。');
      }
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>ログイン</h2>
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
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit" className={styles.button}>ログイン</button>
      </form>

      <Link to="/resetpassword">パスワードをお忘れですか？</Link>
    </div>  
  );
};

export default SignIn;

