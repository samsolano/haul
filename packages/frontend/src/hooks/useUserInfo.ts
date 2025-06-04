import { UserWithId } from "@common/types/user";
import { useEffect, useState } from "react";

export function useUserInfo(id: string | null) {
    const [user, setUser] = useState<UserWithId | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) {
            setUser(null);
            setLoading(false);
            return;
        }

        const fetchUser = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${id}`);
                if (!response.ok) {
                    throw new Error(`Error fetching user: ${response.statusText}`);
                }
                const data: UserWithId = await response.json();
                setUser(data);
            } catch (err) {
                console.error(err);
                setError(err instanceof Error ? err.message : 'Unknown error');
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [id]);

    return { user, loading, error };
}