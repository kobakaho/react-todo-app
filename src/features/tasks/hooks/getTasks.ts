import { Task } from "../../../types/task";
import { mockTasks } from "../mocks/task";

export const getTasks = (): Promise<Task[]> => {
    return new Promise((resolve) => {
        setTimeout(() => resolve([...mockTasks]));
    });
};

// getTasks関数は、モックデータのタスク一覧データを取得する
// 戻り値の値を明示する Promise<Task[]> 
// 呼び出し側で補完・型チェックが効く→バグの早期発見に繋がる　そうなん！？
// データ取得のための関数をhooksディレクトリに配置することで、コンポーネントから分離し、再利用性を高める
// モックデータを使うことで、実際のAPIを待たずに開発を進めることができる
// 実際の開発では、APIからデータを取得するように実装する