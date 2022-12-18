export type PhotosType = {
    small: string | null
    large: string | null
}

export type ContactType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}

export type ProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactType
    photos: PhotosType
}

export type PostStateType = {
    id: number
    message: string
    likesCount: number
}

export type UserType = {
    id: number
    name: string
    status: string
    photos: PhotosType
    followed?: boolean
}