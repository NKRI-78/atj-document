import { BrowserRouter, Routes, Route } from "react-router-dom"

import Login from "@/pages/Login"
import Dashboard from "@/pages/Dashboard"
import NotFound from "@/pages/NotFound"
import MainLayout from "@/layout/MainLayout"
import UploadForm from "@/pages/UploadForm"

import ProtectedRoute from "./ProtectedRoute"
import FolderListPage from "@/pages/FolderListPage"
import FolderDetailPage from "@/pages/FolderDetailPage"

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public */}
                <Route path="/" element={<Login />} />

                {/* Protected */}
                <Route element={<ProtectedRoute />}>
                    <Route element={<MainLayout />}>
                        <Route
                            path="/dashboard"
                            element={<Dashboard />}
                        />

                        <Route
                            path="/upload"
                            element={<UploadForm />}
                        />

                        <Route
                            path="/folders"
                            element={<FolderListPage />}
                        />

                        <Route
                            path="/folders/:parent/:child"
                            element={<FolderDetailPage />}
                        />

                        {/* nanti tinggal tambah */}
                        {/* <Route path="/files" element={<Files />} /> */}
                        {/* <Route path="/settings" element={<Settings />} /> */}
                    </Route>
                </Route>

                {/* 404 */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    )
}