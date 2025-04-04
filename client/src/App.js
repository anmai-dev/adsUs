import './App.scss';
import HomePage from './page/HomePage';
import { BrowserRouter as Router, Route, Routes, Outlet } from "react-router-dom";
import Login from './page/Login';
import Rigister from './page/Rigister';
import AdminPage from './page/adminPage';
import ProtectedRoute from './component/ProtectedRoute';
import UserManagement from './component/UserManagement';
import PostManagement from './component/PostManagement';
import VideoManagement from './component/VideoManagement';
import SchedulePage from './component/SchedulePage';
import PostPage from './page/PostPage';
import PostDetail from './component/post/PostDetail';
import Videos from './page/Videos';
import Schedule from './page/Schedule';
import VideoDetail from './component/video/VideoDetail';
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import ListVideo from './page/ListVideo';
import ListPost from './component/ListPost';
import LinkPage from './page/LinkPage';
import LinkManage from './component/LinkManage';
import LinkDetail from './component/LinkDetail';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Rigister />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/posts" element={<PostPage />} />
            <Route path="/link" element={<LinkPage />} />
            <Route path="/link/:id" element={<LinkDetail />} />
            <Route path="/post/:id" element={<PostDetail />} />
            <Route path="/video/:id" element={<VideoDetail />} />
            <Route path="/video-detail" element={<VideoDetail />} />

            {/* Admin Routes */}
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminPage />
              </ProtectedRoute>
            }>
              <Route path="users" element={<UserManagement />} />
              <Route path="manage-schedule" element={<SchedulePage />} />
              <Route path="manage-posts" element={<PostManagement />} />
              <Route path="manage-videos" element={<VideoManagement />} />
              <Route path="list-videos" element={<ListVideo />} />
              <Route path="list-posts" element={<ListPost />} />
              <Route path="manage-links" element={<LinkManage />} />
            </Route>
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;