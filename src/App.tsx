import { useEffect, useState } from "react";
import { Route, Routes, Outlet } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import PrivateRoute from "./features/auth/PrivateRoute";
import NotFound from "./shared/components/NotFound";
import Homepage from "./pages/home";
import TaskListPage from "./pages/tasks/taskListPage";
import TaskDetailPage from "./pages/tasks/taskDetailPage";
import TaskCreatePage from "./pages/tasks/taskCreatePage";
import TaskEditPage from "./pages/tasks/taskEditPage";
import Header from "./shared/components/Header";
import AuthHeader from "./shared/components/AuthHeader";
import SignUp from "./features/auth/SignUp";
import SignIn from "./features/auth/SignIn";
import ResetPassword from "./features/auth/ResetPassword";
import Mypage from "./features/auth/Mypage";
import Circular from "./shared/components/Circular"
import "./index.css"

function App() {
  const [user, setUser] = useState(auth.currentUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <Circular />;
  }

  return (
      <Routes>
          <Route element={<>{user ? <AuthHeader /> : <Header />}<Outlet /></>}>
            <Route path="/" element={<Homepage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/resetpassword" element={<ResetPassword />} />
          </Route>

          <Route element={<PrivateRoute />}>
              <Route element={<><AuthHeader /><Outlet /></>}>
                <Route path="/mypage" element={<Mypage />} />
                <Route path="/tasks" element={<TaskListPage />} />{/* タスク一覧ページへのルート */}
                <Route path="/tasks/new" element={<TaskCreatePage />} />{/* タスク作成ページへのルート */}
                <Route path="/tasks/:id" element={<TaskDetailPage />} />{/* タスク詳細ページへのルート */}
                <Route path="/tasks/:id/edit" element={<TaskEditPage />} />{/* タスク編集ページへのルート */}
              </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
      </Routes>
  );
}


// default export 1つもモジュールにつき1つの「主要な」をエクスポートする場合に使用する
// import時に任意の名前を付けられる
// ファイル内で1つだけしか定義できない
export default App;

// ルートにアクセスしたらHomepageコンポーネントを表示する
// element={<Homepage />} "/"にアクセスしたときに表示されるコンポーネントを指定
//  element={<TaskListPage />} "/tasks"にアクセスしたらTaskListPageコンポーネントを表示する

// Route  複数の<Route>の中から、現在のURLに一致する最初のルートのみをレンダリング
// Routes URLパスと対応するコンポーネントを定義 パスに一致すると、指定されたコンポーネントがレンダリングされる

// コンポーネント Reactで表示される部品　表示に必要なデータ・処理を一つのオブジェクトにまとめたもの

// 関数コンポーネント
// コンポーネントととして関数を定義する場合「表示するエレメントをreturnで返す」のが基本
// function コンポーネント名( 引数 ) {
//    return ...JSXによる表示...;
// }