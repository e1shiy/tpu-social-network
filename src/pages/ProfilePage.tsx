import Header from "../components/Header.tsx";
import NavHandlersProvider from "../providers/NavHandlersProvider.tsx";
import {useNavigate, useParams} from "react-router-dom";
import Footer from "../components/Footer.tsx";
import {NOT_FOUND_ROUTE} from "../constants";
import {Profile} from "../components/user";
import Content from "../components/wrappers/Content.tsx";

function ProfilePage() {
    const {id} = useParams()
    const navigate = useNavigate()

    if (!id) {
        navigate(NOT_FOUND_ROUTE)
        return
    }

    return (
        <NavHandlersProvider>
            <Header/>
            <Content>
                <Profile/>
            </Content>
            <Footer/>
        </NavHandlersProvider>
    );
}

export default ProfilePage;
