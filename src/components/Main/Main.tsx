import { BrowserRouter, Route, Routes } from "react-router-dom"
import { AdminMain } from "../admin/AdminMain/AdminMain"
import { UserMain } from "../user/UserMain/UserMain"

export const Main = ({isAdmin}: {isAdmin: boolean}) => {
    if (isAdmin) {
        return (
            <AdminMain />
        )
    }
    return (
        <UserMain />
    )

}