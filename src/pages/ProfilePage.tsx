import Header from "../components/Header.tsx";
import NavHandlersProvider from "../providers/NavHandlersProvider.tsx";
import {useNavigate, useParams} from "react-router-dom";
import Footer from "../components/Footer.tsx";
import {useStore} from "../store/store.ts";
import {NOT_FOUND_ROUTE} from "../constants";
import {UserAuthorizedProfile, UserProfile} from "../components/user";
import Content from "../components/Content.tsx";

function ProfilePage() {
    const {id} = useParams()
    const navigate = useNavigate()

    if (!id) {
        navigate(NOT_FOUND_ROUTE)
        return
    }

    const store = useStore()
    const userId = store.userId
    return (
        <NavHandlersProvider>
            <Header/>

            <Content>
                {userId && userId === id ? <UserAuthorizedProfile/> : <UserProfile id={id}/>}
            </Content>

            <Footer/>
        </NavHandlersProvider>
    );
}

export default ProfilePage;
