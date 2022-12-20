import axios from "axios";
import {PhotosType, ProfileType, UserType} from "../types/reduxType";


const instance = axios.create({
    withCredentials: true,
    headers: {
        "API-KEY": "ee87804c-9ca1-4444-8851-6ca251d887b2"
    },
    baseURL: "https://social-network.samuraijs.com/api/1.0/",

});

type GetUsersResponseData = {
    items: Array<UserType>
    totalCount: number
    error: null | string
}

type FollowingResponseData = {
    resultCode: ResultCodeEnum
    messages: string
    data: {}
}

export const usersAPI = {
    getUsers: (currentPage = 1, pageSize = 10) => {
        return instance.get<GetUsersResponseData>(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data;
            })
    },
    unfollow: (userID: number) => {
        return instance.delete<FollowingResponseData>(`follow/${userID}`)
            .then(response => {
                return response.data;
            })
    },

    follow: (userId: number) => {
        return instance.post<FollowingResponseData>(`follow/${userId}`)
            .then(response => {
                return response.data;
            })
    },
    getProfile: (userId: number | null) => {
        console.log("Obsolete method. Please profileAPI object")
        return profileAPI.getProfile(userId)
    }
}

type GetProfileType = ProfileType

type UpdateStatusType = {
    resultCode: ResultCodeEnum
    messages: string
    data: {}
}

type SavePhotoType = {
    data: {
        photos: PhotosType
    }
    resultCode: ResultCodeEnum
    messages: string
}

type SaveProfileType = UpdateStatusType

export const profileAPI = {
    getProfile: (userId: number | null) => {
        return instance.get<GetProfileType>(`profile/${userId}`)
            .then(response => {
                return response.data;
            })
    },
    getStatus: (userId: number) => {
        return instance.get<string>(`profile/status/${userId}`)
            .then(response => {
                return response.data;
            })
    },
    updateStatus: (status: string) => {
        return instance.put<UpdateStatusType>(`profile/status`, {status: status})
            .then(response => {
                return response.data;
            })
    },

    savePhoto: (photoFile: string) => {
        const formData = new FormData();
        formData.append("image", photoFile)
        return instance.put<SavePhotoType>(`profile/photo`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
            .then(response => {
                return response.data;
            })
    },

    saveProfile: (profile: ProfileType) => {
        return instance.put<SaveProfileType>(`profile`, profile)
            .then(response => {
                return response.data;
            })
    }
}

export enum ResultCodeEnum {
    Success = 0,
    Error = 1,
}

export enum ResultCodeForCaptchaEnum {
    CaptchaIsRequired = 10
}

export type GetMeResponseType = {
    data: {
        id: number
        email: string
        login: string
    }
    resultCode: ResultCodeEnum
    messages: Array<string>
}

export type LoginResponseData = {
    data: {
        UserId: number
    }
    resultCode: ResultCodeForCaptchaEnum
    messages: Array<string>
}

export type LogoutResponseData = {
    resultCode: ResultCodeEnum
    messages: Array<string>
    data: {}

}

export const authAPI = {
    getMe: () => {
        return instance.get<GetMeResponseType>(`auth/me`)
            .then(response => {
                return response.data;
            })
    },
    login: (email: string, password: string, rememberMe = false, captcha: null | string = null) => {
        return instance.post<LoginResponseData>(`auth/login`, {email, password, rememberMe, captcha})
            .then(response => {
                return response.data;
            })
    },
    logout: () => {
        return instance.delete<LogoutResponseData>(`auth/login`)
            .then(response => {
                return response.data;
            })
    }
}

type GetCaptchaUrlType = {
    url: string
}

export const securityAPI = {
    getCaptchaUrl: () => {
        return instance.get<GetCaptchaUrlType>(`security/get-captcha-url`)
            .then(response => {
                return response.data;
            })
    }
}


