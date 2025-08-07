import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
    </Routes>
  );
}

export default App;

// ルートにアクセスしたらHomepageを表示する
// element={<Homepage />} "/"にアクセスしたときに表示されるコンポーネントを指定

// Route  複数の<Route>の中から、現在のURLに一致する最初のルートのみをレンダリング
// Routes URLパスと対応するコンポーネントを定義 パスに一致すると、指定されたコンポーネントがレンダリングされる

// コンポーネント Reactで表示される部品　表示に必要なデータ・処理を一つのオブジェクトにまとめたもの

// 関数コンポーネント
// コンポーネントととして関数を定義する場合「表示するエレメントをreturnで返す」のが基本
// function コンポーネント名( 引数 ) {
//    return ...JSXによる表示...;
// }