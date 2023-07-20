import { createContext, useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Form, Modal } from "antd";
import { request } from "../server/request";
import { ENDPOINT, ORDERAGE } from "../const/const";
import { ExclamationCircleOutlined } from "@ant-design/icons";

export const StudentInfoContext = createContext();
const { useForm } = Form;
console.log(useForm);
const StudentContext = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [students, setStudents] = useState([]);
  const [teacherId, setTeacherId] = useState(
    JSON.parse(localStorage.getItem("id"))
  );
  const [search, setSearch] = useState("");
  const [orderAge, setOrderAge] = useState(ORDERAGE[0]);
  const [teacherChange, setTeacherChange] = useState("");
  const [teachersInfo, setTeachersInfo] = useState([]);

  const changeTeacher = useCallback(() => {
    setTeacherChange(teachersInfo?.filter((el) => +el.id === teacherId)[0].firstName);
    console.log(2);
  },[teacherId,teachersInfo]);

  const teacherList = useCallback(async () => {
    try {
      const { data } = await request(ENDPOINT);
      let arr = [];
      data.map((teacher) => {
        arr.push({ firstName: teacher.firstName, id: teacher.id });
      });
      setTeacherChange(arr?.filter((el) => +el.id === teacherId)[0].firstName);
      console.log(teacherId);
      setTeachersInfo(arr);
    } catch (err) {
      console.log(err);
    }
  }, [setTeacherChange, teacherId]);

  const [form] = useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const getStudents = useCallback(async () => {
    try {
      const url = new URL(`${ENDPOINT}/${teacherId}/students`);
      url.searchParams.append("firstName", search);
      if (orderAge === "Increase") {
        url.searchParams.append("sortBy", "age");
        url.searchParams.append("order", "asc");
      } else if (orderAge === "Dicrease") {
        url.searchParams.append("sortBy", "age");
        url.searchParams.append("order", "desc");
      }
      const { data } = await request.get(url);
      setStudents(data);
    } catch (err) {
      console.log(err);
    }
  }, [teacherId, search, orderAge]);

  const addStudent = useCallback(async () => {
    const { student } = await form.validateFields();
    console.log(student);
    if (!selected) {
      try {
        await request.post(`${ENDPOINT}/${teacherId}/students`, student);
        getStudents();
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const { data } = await request.put(
          `${ENDPOINT}/${teacherId}/students/${selected}`,
          student
        );
        console.log(data);
        getStudents();
      } catch (err) {
        console.log(err);
      }
    }
    form.resetFields();
    handleCancel();
  }, [form, selected, getStudents, teacherId]);

  useEffect(() => {
    getStudents();
    teacherList();
  }, [search, getStudents, orderAge, teacherList]);

  const editStudent = async (id) => {
    const { data } = await request.get(
      `${ENDPOINT}/${teacherId}/students/${id}`
    );
    form.setFieldsValue(data);
    console.log(data);
    setSelected(id);
    showModal();
  };

  const { confirm } = Modal;

  const deleteStudent = (id) => {
    confirm({
      title: "Do you Want to delete this Student?",
      icon: <ExclamationCircleOutlined />,
      onOk: async () => {
        await request.delete(`${ENDPOINT}/${teacherId}/students/${id}`);
        getStudents();
      },
      okText: "Delete",
      cancelText: "Cancel",
    });
  };

  const state = {
    isModalOpen,
    showModal,
    setOrderAge,
    handleCancel,
    selected,
    editStudent,
    addStudent,
    form,
    students,
    deleteStudent,
    setSearch,
    orderAge,
    teacherChange,
    setTeacherChange,
    setTeacherId,
    teachersInfo,
  };
  return (
    <StudentInfoContext.Provider value={state}>
      {children}
    </StudentInfoContext.Provider>
  );
};

StudentContext.propTypes = {
  children: PropTypes.node,
};

export default StudentContext;
