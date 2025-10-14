import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import SchedulePage from "./pages/SchedulePage.tsx";
import MailPage from "./pages/MailPage.tsx";
import MessengerPage from "./pages/MessengerPage.tsx";
import CommunitiesPage from "./pages/CommunitiesPage.tsx";
import FriendsPage from "./pages/FriendsPage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/schedule" element={<SchedulePage />} />
                <Route path="/mail" element={<MailPage />} />

                <Route path="/friends" element={<FriendsPage />} />

                <Route path="/messenger/:id?" element={<MessengerPage />} />
                <Route path="/communities/:id?" element={<CommunitiesPage />} />

                <Route path="/profile/:id?" element={<ProfilePage />} />
                <Route path="/" element={<Navigate to="/profile" />} />

                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
