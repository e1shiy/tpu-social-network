import PostImageUrl from "/public/boo.jpg"
import PostImage2Url from "/public/sur2.jpg"
import PostVideoUrl from "/public/video.mp4"
import avatarUrl from "../../assets/images/user-avatar.jpg"

import ProfileHeader from "./ProfileHeader.tsx";
import {useIsMyProfile} from "../../hooks";
import ProfilePostCreator from "../post/PostCreator.tsx";
import {PostPreview} from "../../types/entities";
import Post from "../post/Post.tsx";
import {useEffect, useRef} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {NOT_FOUND_ROUTE} from "../../constants/routes.ts";
import {useImmer} from "use-immer";
import {useStore} from "../../store/store.ts";

function Profile() {
    const isMyProfile = useIsMyProfile()
    const [posts, setPosts] = useImmer<PostPreview[]>([{ // todo user posts
        id: 1,
        isCommentingAllowed: true,
        author: {
            id: "aav105",
            email: "1eshiy@vk.com",
            name: "Алексей",
            surname: "Веретнов",
            avatarUrl: avatarUrl,
            group: "8К43",
            school: "ИШИТР",
            status: "student",
            isOnline: true
        },
        content: {
            text: "Осенний дайджест ᕦ(ò_óˇ)ᕤ",
            attachments: [{
                id: 1,
                type: "image",
                file: null,
                previewUrl: PostImageUrl,
                sourceUrl: PostImageUrl,
                name: "boo.jpg",
                width: 240,
                height: 240,
            }, {
                id: 2,
                type: "image",
                file: null,
                previewUrl: PostImage2Url,
                sourceUrl: PostImage2Url,
                name: "sur2.jpg",
                width: 240,
                height: 240,
            }, {
                id: 3,
                type: "video",
                file: null,
                previewUrl: `${PostVideoUrl}#t=0.1`,
                sourceUrl: PostVideoUrl,
                name: "video",
                width: 384,
                height: 384,
                duration: 6
            }, {
                id: 4,
                type: "document",
                file: null,
                previewUrl: "",
                sourceUrl: "/tpu-social-network/public/12_24_variant.docx",
                name: "12_24_variant.docx",
                size: 117 * 1024
            }]
        },
        details: {
            creationDate: new Date()
        },
        commentAmount: 1,
        likeAmount: 52,
        dislikeAmount: 4
    }]) // todo get posts

    const {showPopUp} = useStore()

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
        <div className="container flex flex-col gap-2.5 md:gap-4 lg:gap-5 min-h-full">
            <ProfileHeader/>
            {isMyProfile && <ProfilePostCreator onCreate={(postContent) => {
                setPosts(p => {
                    p.unshift({
                        id: Date.now(),
                        isCommentingAllowed: true,
                        author: {
                            id: "aav105",
                            email: "1eshiy@vk.com",
                            name: "Алексей",
                            surname: "Веретнов",
                            avatarUrl: avatarUrl,
                            group: "8К43",
                            school: "ИШИТР",
                            status: "student",
                            isOnline: true
                        },
                        content: postContent.content,
                        details: {
                            creationDate: new Date()
                        },
                        commentAmount: 1,
                        likeAmount: 0,
                        dislikeAmount: 0
                    })
                })
                showPopUp("Пост опубликован", "success")
            }}/>}
            <div className={"contents"} ref={postsRef}>
                {posts.length ? posts.map(post => (
                    <Post
                        key={post.id}
                        onContentChange={content => setPosts(draft => { // todo api post change
                            const postToChange = draft.find(po => po.id === post.id)
                            if (postToChange) {
                                postToChange.content = content // todo pop-up
                            }
                        })}
                        onDelete={() => {
                            setPosts(p => p.filter(po => po.id !== post.id))
                            showPopUp("Пост удалён", "success")
                        }}
                        {...post}
                    />
                )) :
                <h2 className={"text-dark/60 flex-center h-full grow"}>Постов пока нет</h2>}
            </div>
        </div>
    )
}

export default Profile