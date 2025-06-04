export async function fetchWithAuth(url: string, jwt: string, options: RequestInit = {}) {
    const authHeaders = {
        'Authorization': `Bearer ${jwt}`,
        'Content-Type': 'application/json',
        ...options.headers,
    };

    return fetch(url, {
        ...options,
        headers: authHeaders,
    });
}