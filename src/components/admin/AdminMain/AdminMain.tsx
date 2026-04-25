import { Edit } from "./Edit"
import { AdminList } from "./AdminList"
import { BrowserRouter, Routes, Route } from "react-router-dom"
export const AdminMain = () => {
    
    return (
        <>
        <h1>Admin main</h1>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<AdminList />} />
                    <Route path="/:id" element={<Edit />} />
                </Routes>    
            </BrowserRouter>
        </>
    )
}