import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut, deleteUser, updateProfile, User } from 'firebase/auth';
import { auth } from '../../firebase';
import { deleteUserTasks } from "../../features/auth/api/deleteUserTasks"
import Divider from '@mui/material/Divider';
import Circular from "../../shared/components/Circular";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import styles from "../../styles/auth.module.css";


const Mypage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (!currentUser) {
        navigate("/signup")
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/signin");
      alert("ログアウトしました");
      console.log("ログアウトしました")
    } catch (error) {
      console.error("ログアウトエラー:", error);
    }
  };
//アバターの変更まだ
  const handleUpdateProfile = async () => {
    if (auth.currentUser) {
      try{
        await updateProfile(auth.currentUser, { displayName: username, photoURL: auth.currentUser.photoURL });
        alert("プロフィールが更新されました");
        setDialogOpen(false);
      } catch (error) {
        console.error("プロフィールの更新に失敗しました:", error);
        alert("プロフィールの更新に失敗しました");
      }
    }
  };

  const handleDeleteAccount = async () => {
    if (user) {
      try {
        if (confirm("本当にアカウントを削除しますか？作成したタスクもすべて削除されます")) {
          await deleteUserTasks(user.uid);
          await deleteUser(user);
          navigate("/signup");
          alert("アカウントを削除しました");
          console.log("アカウントを削除しました")
        }
      } catch (error) {
        console.error('アカウント削除エラー:', error);
        alert('アカウント削除に失敗しました。');
      }
    }
  };

  if (loading) {
    return <Circular />;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>マイページ</h2>
      <Divider variant="middle" sx={{ mb: 3, mt: 2 }} />

      {user ? <p>こんにちは、{user.displayName || '名無し'}さん！</p> : <p>ログインしていません。</p>}
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button  variant="outlined" onClick={() => {setDialogOpen(true)}}>ユーザー名を変更</Button>
      </div>

      <Dialog open={dialogOpen} onClose={() => {setDialogOpen(false)}}>
        <DialogTitle>ユーザー名を変更</DialogTitle>
        <DialogContent>
          <TextField
            label="新しいユーザー名"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {setDialogOpen(false)}}>キャンセル</Button>
          <Button onClick={handleUpdateProfile}>更新</Button>
        </DialogActions>
      </Dialog>

      {user ? <p>メールアドレス：{user.email}</p> : null}

      <Divider variant="middle" sx={{ mb: 2, mt: 2 }} />

      <button onClick={handleSignOut} className={`${styles.button} ${styles.logoutBtn}`}>
        ログアウト
      </button>
      <button onClick={handleDeleteAccount} className={`${styles.button} ${styles.deleteBtn}`}>
        アカウント削除
      </button>
    </div>
  );
};

export default Mypage;
