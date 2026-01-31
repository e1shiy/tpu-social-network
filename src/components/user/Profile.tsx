import PostImageUrl from "../../assets/123.png"
import PostImageUrl2 from "../../assets/images/user-avatar.jpg"
import ProfileHeader from "./ProfileHeader.tsx";
import {useIsMyProfile} from "../../hooks";
import ProfilePostCreator from "../post/PostCreator.tsx";
import {PostPreview} from "../../types/entities";
import Post from "../post/Post.tsx";
import {useEffect, useRef} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {NOT_FOUND_ROUTE} from "../../constants";

function Profile() {
    const isMyProfile = useIsMyProfile()
    const [posts, setPosts] = useImmer<PostPreview[]>([{ // todo user posts
        id: 1,
        isCommentingAllowed: true,
        content: {
            text: "Моя новая крутая аватарка D:",
            attachments: [{
                id: 1,
                type: "image",
                width: 240,
                height: 240,
                name: "user-avatar.jpg",
                size: 20726,
                url: PostImageUrl
            }, {
                id: 2,
                type: "document",
                name: "PNG_-SVG.zip",
                size: 2094840,
                url: "tpu-social-network/src/assets/PNG_-SVG.zip"
            }, {
                id: 3,
                type: "video",
                name: "2025-12-04 22-54-40.mp4",
                size: 19216345,
                url: "tpu-social-network/src/assets/2025-12-04 22-54-40.mp4",
                width: 1920,
                height: 1080,
                duration: 17
            }, {
                id: 4,
                type: "image",
                width: 240,
                height: 240,
                name: "123.jpg",
                size: 20726,
                url: PostImageUrl2
            }]
        },
        details: {
            creationDate: new Date()
        },
        commentAmount: 160,
        likeAmount: 53,
        dislikeAmount: 4
    }]) // todo get posts

    const navigate = useNavigate()
    const location = useLocation()
    const postsRef = useRef<HTMLDivElement>(null)
    const isPostsSection = location.pathname.endsWith("/posts")
    const {postId} = useParams()

    useEffect(() => {
        if (isPostsSection) {
            postsRef.current?.scrollIntoView({behavior: "smooth"})
        } else if (postId && isNaN(Number(postId))) {
            navigate(NOT_FOUND_ROUTE)
        }
    }, [isPostsSection, postId, navigate])

    return (
        <div className="container flex flex-col gap-2.5 md:gap-4 lg:gap-5">
            <ProfileHeader/>
            {isMyProfile && <ProfilePostCreator/>}
        </div>
    )
}

export default Profile