import axios from "axios";
import {profileType} from "../Redux/profile-reducer";

type CommonResponseType<T = {}> = {
    resultCode: number
    messages: Array<string>
    data: T
}
type getAuthTypeResponse = {
    id: string
    email: string
    login: string
}

const instanse = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    withCredentials: true,
    headers: {
        'api-key': '0788c074-2a2b-400e-ae91-bcf1a7100923'
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
    },
    updatePhotoProfile(photo: File) {
        let formData = new FormData()
        formData.append("image", photo)
        return instanse.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    saveProfile(profile: profileType) {
        return instanse.put( 'profile', profile)
    }
}

export const authAPI = {
    getAuth() {
        return instanse.get<CommonResponseType<getAuthTypeResponse>>(`auth/me`)
    },
    login(email: string, password: string, rememberMe:boolean = false, captcha: string |null = null) {
        return instanse.post<CommonResponseType<{userId: string}>>(`auth/login`, {email, password, rememberMe, captcha})
    },
    logout() {
        return instanse.delete<CommonResponseType>(`auth/login`,)
    }
}

export const securityAPI = {
    getCaptchaUrl() {
        return instanse.get('security/get-captcha-url')
    }
}







