import Header from "../components/Header.tsx";
import NavHandlersProvider from "../providers/NavHandlersProvider.tsx";
import {useParams} from "react-router-dom";

function ProfilePage() {
    const { id } = useParams()
    return (
        <NavHandlersProvider>
            <Header userId={id}/>
            ProfilePage
        </NavHandlersProvider>
    );
}

export default ProfilePage;
