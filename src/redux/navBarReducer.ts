type FriendsStateType = {
    id: number
    name: string
    photo: string
}

type ItemStateType = {
    id: number
    to: string
    linkText: string
}

export type InitialStateType = typeof initialState

let initialState = {
    friends: [
        {id: 1, name: 'Andrey', photo: 'https://moika78.ru/news2/2020/08/Avatar.jpg'},
        {id: 2, name: 'Sasha', photo: 'https://akm-img-a-in.tosshub.com/indiatoday/images/story/201907/imgonline-com-ua-FrameBlurred-_14.jpeg?m6aZMJ2FuRNdIJhw9MbIpcGgJvY3yzW6&size=770:433'},
        {id: 3, name: 'Sveta', photo: 'https://avatars.mds.yandex.net/get-kino-vod-films-gallery/28788/47e2fd514411e18b76af786d7417062d/100x64_3'},
    ] as Array<FriendsStateType>,
    item: [
        {id: 1, to: '/profile', linkText: 'Profile'},
        {id: 2, to: '/dialogs', linkText: 'Messages'},
        {id: 3, to: '/news', linkText: 'News'},
        {id: 4, to: '/music', linkText: 'Music'},
        {id: 5, to: '/users', linkText: 'Users'},
        {id: 6, to: '/setting', linkText: 'Settings'},
    ] as Array<ItemStateType>
};

const navBarReducer = (state = initialState, action: any): InitialStateType => {
  return state;
}

export default navBarReducer;