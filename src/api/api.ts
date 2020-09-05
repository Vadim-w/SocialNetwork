import axios from "axios";

const instanse = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    withCredentials: true,
    headers: {
        'api-key': '1ddb00ae-87fd-4067-9570-c868a2d6ade3'
    }
})

export const getUsers = (currentPage: number, pageSize: number) => {
    return instanse.get(`users?page=${currentPage}&count=${pageSize}`, {
        }).then(response => response.data)}

export const  getAuth = () => {
    return  instanse.get(`auth/me`)
        .then((response: any) => response.data);
}

export const getProfile = (userId: string) => {
    return instanse.get(`profile/` + userId)
        .then(response => response.data);
}

export const deleteFollow = (userId: string) => {
    return instanse.delete(`follow/${userId}`,)
        .then(response => response.data);
}

export const  postFollow = (userId: string) => {
    return instanse.post(`follow/${userId}`, {}, {})
        .then(response => response.data);
}





