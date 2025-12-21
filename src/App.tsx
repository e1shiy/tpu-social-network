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
import {useStore} from "./store/store.ts";

function App() {
    const {userId} = useStore()

    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter basename={"/tpu-social-network/"}>
                <Routes>
                    <Route element={<ProtectedRoute/>}>
                        <Route path="/messenger/:id?" element={<MessengerPage />} />
                        <Route path="/friends" element={<FriendsPage />} />
                        <Route path="/" element={<Navigate to={`/${userId}`} />} />
                    </Route>

                    <Route path="/communities/:id?" element={<CommunitiesPage />} />
                    <Route path="/:id" element={<ProfilePage />} />

                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    )
}

export default App
