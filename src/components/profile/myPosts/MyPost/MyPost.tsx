
import s from './MyPost.module.css';

type MyPostPropsType = {
    message: string
    likesCount: number
}

const MyPost = (props: MyPostPropsType) => {
    return (
        <article className={s.post}>
            <img className={s.postImg}
                 src={'https://m.media-amazon.com/images/M/MV5BMTMxOTEwNDcxN15BMl5BanBnXkFtZTcwOTg0MTUzNA@@._V1_.jpg'}
                 alt='photo user'/>
            <p className={s.postText}>{props.message}</p>
            <div className={s.postLike}>
                <span>like {props.likesCount}</span>
            </div>
        </article>
    )
}

export default MyPost;
