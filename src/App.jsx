import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/adminLayout";
import TeachersPage from "./pages/TeacherPage";
import StudentsPage from "./pages/StudentsPage";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { useContext } from "react";
import { LoginInfo } from "./useContext/LoginContext";

const App = () => {
  const { auth } = useContext(LoginInfo);
  console.log(auth);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            auth ? <Navigate to="/teachers" /> : <Navigate to="/login" />
          }
        />

        <Route path="/" element={<Layout />}>
          <Route path="teachers" element={<TeachersPage />} />
          <Route path="students" element={<StudentsPage />} />
        </Route>

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
