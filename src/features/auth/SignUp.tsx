import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../../firebase"; // authインスタンスをインポート
import { useNavigate } from 'react-router-dom';

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
      alert('登録が完了しました！');
      navigate('/mypage'); // 登録成功後、マイページへリダイレクト
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
    <div>
      <h2>新規登録</h2>
      <form onSubmit={handleSignUp}>
        <div>
          <label htmlFor="email">メールアドレス:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">パスワード:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">登録</button>
      </form>
    </div>
  );
};

export default SignUp;

