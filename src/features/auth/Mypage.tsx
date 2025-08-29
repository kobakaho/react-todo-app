import React, { useEffect, useState } from 'react';
import styles from "../../styles/auth.module.css";
import { onAuthStateChanged, signOut, deleteUser, updateProfile, User } from 'firebase/auth';
import { auth } from '../../firebase'; // authインスタンスをインポート
import { useNavigate } from 'react-router-dom';

const Mypage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (!currentUser) {
        // ユーザーがログインしていない場合、ログインページへリダイレクト
        navigate('/signin');
      }
    });

    // クリーンアップ関数
    return () => unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      alert('ログアウトしました。');
      navigate('/signin'); // ログアウト後、ログインページへリダイレクト
    } catch (error) {
      console.error('ログアウトエラー:', error);
      alert('ログアウトに失敗しました。');
    }
  };

  const handleUpdateProfile = async (e:React.FormEvent) => {
    e.preventDefault();
    if (auth.currentUser) {
      try{
        await updateProfile(auth.currentUser, { displayName: username, photoURL: auth.currentUser.photoURL });
        alert("プロフィールを更新しました。");
      } catch (error) {
        console.error("プロフィールの更新に失敗しました:", error);
        alert("プロフィールの更新に失敗しました。");
      }
    }
  };

  const handleDeleteAccount = async () => {
    if (user) {
      try {
        if (confirm('本当にアカウントを削除しますか？')) {
          await deleteUser(user);
          alert('アカウントを削除しました。');
          navigate('/signup'); // アカウント削除後、サインアップページへリダイレクト
        }
      } catch (error) {
        console.error('アカウント削除エラー:', error);
        alert('アカウント削除に失敗しました。');
      }
    }
  };

  if (loading) {
    return <div>認証状態を確認中...</div>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>マイページ</h2>
      {user ? <p>こんにちは、{user.displayName || '名無し'}さん！</p> : <p>ログインしていません。</p>}
      {user ? <p>メールアドレス：{user.email}</p> : null}

      <form onSubmit={handleUpdateProfile} className={styles.form}>
        <div className={styles.formGroup}>

        <label htmlFor="username" className={styles.label}>ユーザーネーム:</label>
        <input
          type="username"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={styles.input}
          required
        />
        <button type="submit" className={styles.button}>更新</button>
        </div>
      </form>

      <button onClick={handleSignOut} className={`${styles.button} ${styles.logoutBtn}`}>
        ログアウト
      </button>
      <button onClick={handleDeleteAccount} className={`${styles.button} ${styles.deleteBtn}`}>
        アカウント削除
      </button>

    </div>  );
};

export default Mypage;

