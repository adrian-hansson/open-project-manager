const apiFetch = <T>(url: string, request = {}): Promise<T> => {
    return fetch(url, request)
        .then((response: any) => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }

            return response.json() as Promise<T>;
        });
};

const apiGet = <T>(url: string): Promise<T> => {
    const request: RequestInit = {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        }
    };

    return apiFetch<T>(url, request);
};

const apiDelete = <T>(url: string): Promise<T> => {
    const request: RequestInit = {
        method: 'DELETE',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        }
    };

    return apiFetch<T>(url, request);
};

const apiPost = <T>(url: string, data = {}): Promise<T> => {
    const request: RequestInit = {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data)
    };

    return apiFetch<T>(url, request);
};

const api = {
    get: apiGet,
    delete: apiDelete,
    post: apiPost
};

export default api;
