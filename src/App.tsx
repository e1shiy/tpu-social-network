import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import MessengerPage from "./pages/MessengerPage.tsx";
import CommunitiesPage from "./pages/CommunitiesPage.tsx";
import FriendsPage from "./pages/FriendsPage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import {QueryClientProvider} from "@tanstack/react-query";
import {queryClient} from "./services";
import "./index.css"
import ProtectedRoute from "./components/ProtectedRoute.tsx";

function App() {
    const userId = 1 // TODO userId

    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route element={<ProtectedRoute/>}>
                        <Route path="/messenger/:id?" element={<MessengerPage />} />
                        <Route path="/friends" element={<FriendsPage />} />
                    </Route>

                    <Route path="/communities/:id?" element={<CommunitiesPage />} />
                    <Route path="/" element={<Navigate to={`/${userId}`} />} /> {/* todo auth check */}
                    <Route path="/:id?" element={<ProfilePage />} />

                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    )
}

export default App
