import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./features/auth/PrivateRoute";
import Homepage from "./pages/home";
import TaskListPage from "./pages/tasks/taskListPage";
import TaskDetailPage from "./pages/tasks/taskDetailPage";
import TaskCreatePage from "./pages/tasks/taskCreatePage";
import TaskEditPage from "./pages/tasks/taskEditPage";
import ToDoListPage from "./pages/todo/todoListPage";
import Header from "./shared/components/Header";
import SignUp from "./features/auth/SignUp";
import SignIn from "./features/auth/SignIn";
import ResetPassword from "./features/auth/ResetPassword";
import Mypage from "./features/auth/Mypage";


function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route element={<PrivateRoute />}>
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/tasks" element={<TaskListPage />} />{/* タスク一覧ページへのルート */}
          <Route path="/tasks/new" element={<TaskCreatePage />} />{/* タスク作成ページへのルート */}
          <Route path="/tasks/:id" element={<TaskDetailPage />} />{/* タスク詳細ページへのルート */}
          <Route path="/tasks/:id/edit" element={<TaskEditPage />} />{/* タスク編集ページへのルート */}
          <Route path="/todo" element={<ToDoListPage />} />{/* Todoページへのルート */}
        </Route>
        </Routes>
    </>
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