const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_API_URL;

async function get(url) {
    const res = await fetch(`${BASE_URL}/${url}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    return res.json();
}

async function getWithToken(url, token) {
    const res = await fetch(`${BASE_URL}/${url}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    return res.json();
}

async function getId(url, id) {
    const res = await fetch(`${BASE_URL}/${url}/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    return res.json();
}

async function post(url, data) {
    debugger;
    const res = await fetch(`${BASE_URL}/${url}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return res.json();
}

async function put(url, data) {
    const res = await fetch(`${BASE_URL}/${url}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return res.json();
}

async function deleteRequest(url) {
    const res = await fetch(`${BASE_URL}/${url}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
    return res.json();
}

export { get, getWithToken, getId, post, put, deleteRequest, BASE_URL };


