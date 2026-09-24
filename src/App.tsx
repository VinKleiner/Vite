import './App.css'
import HomePage from "./pages/home/HomePage.tsx"
import LoginPage from "./pages/login/LoginPage.tsx"
import NotFoundPage from "./pages/NotFound/NotFoundPage.tsx"
import {Route, Routes} from "react-router"
import SLayout from "./components/SLayout/SLayout.tsx"
import RegisterPage from "./pages/Register/RegisterPage.tsx"


function App() {

    console.log('Рендер App Component')

    return (
        <>
            <Routes>
                <Route path="/" element={<SLayout />}>
                    <Route index element={<HomePage />} />
                    <Route path="login" element={<LoginPage />} />
                    <Route path="register" element={<RegisterPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Route>
            </Routes>
        </>
    )
}

export default App