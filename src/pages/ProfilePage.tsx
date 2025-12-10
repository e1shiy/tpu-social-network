import Header from "../components/Header.tsx";
import NavHandlersProvider from "../providers/NavHandlersProvider.tsx";
import {useParams} from "react-router-dom";
import Footer from "../components/Footer.tsx";

function ProfilePage() {
    const { id } = useParams()
    return (
        <NavHandlersProvider>
            <Header userId={id}/>
            ProfilePage
            <Footer/>
        </NavHandlersProvider>
    );
}

export default ProfilePage;
