import Header from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";
import NavHandlersProvider from "../providers/NavHandlersProvider.tsx";

function MessengerPage() {
    return (
        <NavHandlersProvider>
            <Header userId={"1"}/>
            MessengerPage
            <Footer/>
        </NavHandlersProvider>
    )
}

export default MessengerPage