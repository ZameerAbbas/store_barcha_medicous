import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import { JSX, useEffect } from "react";

export default function ProtectedPage({
    children,
    redirectTo = "/login",
}: {
    children: JSX.Element;
    redirectTo?: string;
}) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.replace(`${redirectTo}?next=${router.asPath}`);
        }
    }, [user, loading]);

    if (loading || !user) return null;

    return children;
}
