import PostImageUrl from "/public/123.png"
import PostVideoUrl from "/public/35b70366-22af-4cf6-9a61-a66af45cf292.mp4"

import ProfileHeader from "./ProfileHeader.tsx";
import {useIsMyProfile} from "../../hooks";
import ProfilePostCreator from "../post/PostCreator.tsx";
import {PostPreview} from "../../types/entities";
import Post from "../post/Post.tsx";
import {useEffect, useRef} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {NOT_FOUND_ROUTE} from "../../constants";
import {useImmer} from "use-immer";

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
                file: null,
                previewUrl: PostImageUrl,
                sourceUrl: PostImageUrl,
                name: "user-avatar.jpg",
                width: 240,
                height: 240,
            }, {
                id: 2,
                type: "video",
                file: null,
                previewUrl: `${PostVideoUrl}#t=0.1`,
                sourceUrl: PostVideoUrl,
                name: "2025-12-04 22-54-40",
                width: 1920,
                height: 1080,
                duration: 17
            }, {
                id: 3,
                type: "document",
                file: null,
                previewUrl: "",
                sourceUrl: "/tpu-social-network/public/PNG_-SVG.zip",
                name: "PNG_-SVG.zip",
                size: 2046 * 1024
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
            <div className={"contents"} ref={postsRef}>
                {posts.map(post => (
                    <Post
                        key={post.id}
                        onContentChange={content => setPosts(draft => { // todo api post change
                            const postToChange = draft.find(po => po.id === post.id)
                            if (postToChange) {
                                postToChange.content = content
                            }
                        })}
                        onDelete={() => setPosts(p => p.filter(po => po.id !== post.id))}
                        {...post}
                    />
                ))}
            </div>
        </div>
    )
}

export default Profile