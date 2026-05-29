import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BlogIndex from "./pages/BlogIndex";
import BlogDetail from "./pages/BlogDetail";
import LoginPage from "./pages/LoginPage";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import PostsPage from "./pages/admin/PostsPage";
import EditorPage from "./pages/admin/EditorPage";
import PreviewPage from "./pages/admin/PreviewPage";
import ProductsPage from "./pages/admin/ProductsPage";
import MediaPage from "./pages/admin/MediaPage";
import UsersPage from "./pages/admin/UsersPage";
import SettingsPage from "./pages/admin/SettingsPage";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/blog" element={<BlogIndex />} />
      <Route path="/blog/:slug" element={<BlogDetail />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="posts" element={<PostsPage />} />
        <Route path="editor" element={<EditorPage />} />
        <Route path="preview/:id" element={<PreviewPage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="media" element={<MediaPage />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
