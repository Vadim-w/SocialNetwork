import axios from "axios";

const instanse = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    withCredentials: true,
    headers: {
        'api-key': '1ddb00ae-87fd-4067-9570-c868a2d6ade3'
    }
})


export const usersAPI = {
    getUsers(currentPage: number = 1, pageSize: number = 10) {
        return instanse.get(`users?page=${currentPage}&count=${pageSize}`, {
        }).then(response => response.data)
    },
    follow (userId: string) {
        return instanse.post(`follow/${userId}`, {}, {})
            .then(response => response.data);
    },
    unFollow(userId: string) {
        return instanse.delete(`follow/${userId}`,)
            .then(response => response.data);
    },
    getAuth() {
        return instanse.get(`auth/me`)
            .then((response: any) => response.data);
    }
}

export const profileAPI = {
    getProfile(userId: string) {
        return instanse.get(`profile/` + userId)
            .then(response => response.data);
    },
    getStatus(userID: string) {
        return instanse.get( `profile/status/`+ userID)
    },
    updateStatus(status: string) {
        return instanse.put(`profile/status`, {status} )
    }
}







