import axios from 'axios';


const instance = axios.create({
    withCredentials: true,
    headers: {
        'API-KEY': 'ee87804c-9ca1-4444-8851-6ca251d887b2'
    },
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',

});

export const usersAPI = {
    getUsers: (currentPage = 1, pageSize = 10) => {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data;
            })
    },
    unfollow: (userID) => {
        return instance.delete(`follow/${userID}`)
            .then(response => {
                return response.data;
            })
    },

    follow: (userID) => {
        return instance.post(`follow/${userID}`)
            .then(response => {
                return response.data;
            })
    },
    getProfile: (userId) => {
        console.log('Obsolete method. Please profileAPI object')
        return profileAPI.getProfile(userId)
    }
}

export const profileAPI = {
    getProfile: (userId) => {
        return instance.get(`profile/${userId}`)
            .then(response => {
                return response.data;
            })
    },
    getStatus: (userId) => {
        return instance.get(`profile/status/${userId}`)
            .then(response => {
                return response.data;
            })
    },
    updateStatus: (status) => {
        return instance.put(`profile/status`, {status: status})
            .then(response => {
                return response.data;
            })
    },

    savePhoto: (photoFile) => {
        const formData = new FormData();
        formData.append('image', photoFile)
        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => {
                return response.data;
            })
    },

    saveProfile: (profile) => {
        return instance.put(`profile`, profile)
            .then(response => {
                return response.data;
            })
    }
}

export const authAPI = {
    getMe: () => {
        return instance.get(`auth/me`)
            .then(response => {
                return response.data;
            })
    }, login: (email, password, rememberMe = false, captcha = null) => {
        return instance.post(`auth/login`, {email, password, rememberMe, captcha})
            .then(response => {
                return response.data;
            })
    }, logout: () => {
        return instance.delete(`auth/login`)
            .then(response => {
                return response.data;
            })
    }
}

export const securityAPI = {
    getCaptchaUrl: () => {
        return instance.get(`security/get-captcha-url`)
            .then(response => {
                return response.data;
            })
    }
}


