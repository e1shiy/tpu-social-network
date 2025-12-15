import Header from "../components/Header.tsx";
import NavHandlersProvider from "../providers/NavHandlersProvider.tsx";
// import {useParams} from "react-router-dom";
import Footer from "../components/Footer.tsx";
import {useStore} from "../store/store.ts";
import clsx from "clsx";
import {twMerge} from "tailwind-merge";
import avatarUrl from "../assets/images/i.webp"
import EditIcon from "../assets/images/edit.svg?react"
import TextButton from "../components/TextButton.tsx";
import Button from "../components/Button.tsx";

function ProfilePage() {
    // const {id} = useParams()
    const {userId} = useStore()
    const userAvatarUrl = avatarUrl // todo user info
    return (
        <NavHandlersProvider>
            <Header userId={userId}/>

            <div className="container flex flex-col gap-2.5 md:gap-4 lg:gap-5">
                <div className={twMerge(clsx(`
                    shadow-base w-full flex max-md:flex-col items-start justify-between md:items-stretch bg-light
                    rounded-2xl lg:rounded-[1.25rem] p-3.75 md:p-4.25 lg:p-5
                    gap-4 md:gap-5
                `))}>
                    <div className={twMerge(clsx(`flex items-center justify-start gap-4 md:gap-5 h-full max-w-full min-w-0`))}>
                        <div className={twMerge(clsx(`
                            relative aspect-square rounded-full shrink-0 overflow-hidden h-25 sm:h-30 md:h-35 lg:h-40 xl:h-45 2xl:h-50
                            after:ring-dark/10 after:z-10 after:rounded-full after:ring-3 after:lg:ring-4 after:2xl:ring-5 after:ring-inset after:absolute after:inset-0
                        `))}>
                            <img className={twMerge(clsx(`aspect-square h-full`))} src={userAvatarUrl} alt="avatar"/>
                        </div>
                        <div className={twMerge(clsx(`flex flex-col gap-2.5 sm:gap-3 md:gap-4 lg:gap-5 min-w-0 max-w-full`))}>
                            <div className="flex flex-col items-start max-w-full">
                                <h2 className="truncate">Веретнов Алексей</h2>
                                <TextButton className="text-dark/60 text-start font-normal truncate max-w-full">
                                    23 y.o. designer from San Francisco
                                </TextButton>
                            </div>

                            <Button TrailingIcon={EditIcon} className="max-md:hidden w-max">Редактировать профиль</Button>

                            <div className={twMerge(clsx(`flex flex-col md:hidden text-dark/60 items-start`))}>
                                <TextButton className="font-normal">25345 друзей</TextButton>
                                <TextButton className="font-normal">3 подписки</TextButton>
                            </div>
                        </div>
                    </div>

                    <div
                        className={twMerge(clsx(`
                            max-md:hidden flex flex-col items-end justify-between text-dark/60 py-2.5 shrink-0
                        `))}> {/* todo padding-block тут лишний, но выглядит без него плохо */}
                        <div>
                            <p>ИШИТР ТПУ, Бакалавриат, Группа 8К43</p>
                            <p>Программная инженерия, 2 курс</p>
                        </div>

                        <div className={twMerge(clsx(`flex flex-col`))}>
                            <TextButton className="font-normal">25345 друзей</TextButton>
                            <TextButton className="font-normal">3 подписки</TextButton>
                        </div>
                    </div>

                    <Button TrailingIcon={EditIcon} className="md:hidden w-full">Редактировать профиль</Button>
                </div>
            </div>

            <Footer/>
        </NavHandlersProvider>
    );
}

export default ProfilePage;
