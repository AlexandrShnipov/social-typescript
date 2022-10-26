import dialogPageReducer from './dialogPageReducer';
import navBarReducer from './navBarReducer';
import profilePageReducer from './profilePageReducer';

let store = {
    _state: {
        profilePage: {
            posts: [
                {id: '1', message: 'Hi, my friends', likesCount: '11',},
                {id: '2', message: `It's my first post`, likesCount: '25',},
            ],
            addPostText: 'IT-Kamasutra.com',
        },
        dialogsPage: {
            dialogs: [
                {id: '1', name: 'Dima', photo: 'https://lwlies.com/wp-content/uploads/2017/04/avatar-2009.jpg'},
                {id: '2', name: 'Sasha', photo: 'https://preview.redd.it/eoaqok0btkwz.jpg?auto=webp&s=2b678aa0f24b7cc95ddd9648fd0582050182a496'},
                {id: '3', name: 'Dasha', photo: 'https://i.pinimg.com/originals/d2/b6/02/d2b602309654e552cdebaa58da93d2c9.jpg'},
                {id: '4', name: 'Pasha', photo: 'https://www.kino-teatr.ru/video/243/start.jpg'},
                {id: '5', name: 'Valera', photo: 'https://static0.srcdn.com/wordpress/wp-content/uploads/2021/02/Avatar-Next-Shadow-2-1.jpg'},
                {id: '6', name: 'Sveta', photo: 'https://live.staticflickr.com/3815/10785443136_e549eceab6_b.jpg'},
                {id: '7', name: 'Lena', photo: 'https://talleesavage.files.wordpress.com/2010/05/avatar-2.jpg'},
            ],
            messages: [
                {id: '1', message: 'Hi'},
                {id: '2', message: 'How is your it-kamasutra?'},
                {id: '3', message: 'Yo'},
                {id: '4', message: 'Yo'},
                {id: '5', message: 'Yo'},
            ],
            addMessageText: '',
        },
        navBar: {
            friends: [
                {id: '1', name: 'Andrey', photo: 'https://moika78.ru/news2/2020/08/Avatar.jpg'},
                {id: '2', name: 'Sasha', photo: 'https://akm-img-a-in.tosshub.com/indiatoday/images/story/201907/imgonline-com-ua-FrameBlurred-_14.jpeg?m6aZMJ2FuRNdIJhw9MbIpcGgJvY3yzW6&size=770:433'},
                {id: '3', name: 'Sveta', photo: 'https://avatars.mds.yandex.net/get-kino-vod-films-gallery/28788/47e2fd514411e18b76af786d7417062d/100x64_3'},
            ],
            item: [
                {id: '1', to: '/profile', linkText: 'Profile'},
                {id: '2', to: '/dialogs', linkText: 'Messages'},
                {id: '3', to: '/news', linkText: 'News'},
                {id: '4', to: '/music', linkText: 'Music'},
                {id: '5', to: '/setting', linkText: 'Settings'},
            ]
        }
    },
    getState() {
        //debugger;
        return this._state; // обращаемся к store по ООП
    },
    _callSubscriber () {
        console.log('state chander')
    },

    subscribe(observer) {
    this._callSubscriber = observer; // наблюдатель - паттерн
    },

    dispatch (action) {
       // debugger
        this._state.profilePage = profilePageReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogPageReducer(this._state.dialogsPage, action);
       navBarReducer();

        this._callSubscriber(this._state)
    }
}

export default store;




// console.log(state.profilePage.dialogs[1].name)
window.store = store;