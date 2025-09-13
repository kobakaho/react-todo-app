import React, { useEffect, useState } from "react";
import Circular from "../../shared/components/Circular";
import { onAuthStateChanged, User } from "firebase/auth";
import { Navigate, Outlet } from "react-router-dom";
import { auth } from "../../firebase";

const PrivateRoute: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        // コンポーネントがアンマウントされる際に監視を解除
        return () => unsubscribe();
    }, []);

    if (loading) {
        return <Circular />;
    }

    // ユーザーがいれば子ルート（Outlet）を表示、いなければログインページへリダイレクト
    return user ? <Outlet /> : <Navigate to="/signin" replace />;
};

export default PrivateRoute;