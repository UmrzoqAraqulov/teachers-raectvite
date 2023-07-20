import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/adminLayout";
import TeachersPage from './pages/TeacherPage'
import StudentsPage from './pages/StudentsPage'
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

const App = () => {
  const isAuth = true;
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            isAuth ? <Navigate to="/teachers" /> : <Navigate to="/login" />
          }
        />

        <Route path="/" element={<Layout />}>
          <Route path="teachers" element={<TeachersPage />} />
          <Route path="students" element={<StudentsPage />} />
          <Route path="notfound" element={<NotFoundPage />} />
        </Route>

        <Route path="/login" alement={<LoginPage />} />
        <Route path="/register" alement={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
