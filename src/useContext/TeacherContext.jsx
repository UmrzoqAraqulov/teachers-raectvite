import { createContext, useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Form, Modal } from "antd";
import { request } from "../server/request";
import { ENDPOINT, ISMARRIED } from "../const/const";
import { ExclamationCircleOutlined } from "@ant-design/icons";

export const TeacherInfoContext = createContext();
const { useForm } = Form;

const TeacherContext = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [teachers, setTeachers] = useState([]);
  const [search, setSearch] = useState("");
  const [isMarried, setIsMarried] = useState(ISMARRIED[0]);

  const [form] = useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const getTeachers = useCallback(async () => {
    try {
      const url = new URL(ENDPOINT);
      if(isMarried!=="All"){
        url.searchParams.append('isMarried',isMarried);
      }
      url.searchParams.append('firstName',search);
      const { data } = await request.get(url);
      setTeachers(data);
    } catch (err) {
      console.log(err);
    }
  }, [search,isMarried]);

  const addTeacher = useCallback(async () => {
    const { teacher } = await form.validateFields();
    if (!selected) {
      try {
        await request.post(ENDPOINT, teacher);
        getTeachers();
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const { data } = await request.put(`${ENDPOINT}/${selected}`, teacher);
        console.log(data);
        getTeachers();
      } catch (err) {
        console.log(err);
      }
    }
    form.resetFields();
    handleCancel();
  }, [form, selected, getTeachers]);

  useEffect(() => {
    getTeachers();
  }, [search, getTeachers,isMarried]);

  const editTeacher = async (id) => {
    const { data } = await request.get(`${ENDPOINT}/${id}`);
    const newData = { ...data, group: data.group.join(",") };
    form.setFieldsValue(newData);
    console.log({ ...newData });
    setSelected(id);
    showModal();
  };

  const { confirm } = Modal;

  const deleteTeacher = (id) => {
    confirm({
      title: "Do you Want to delete this teacher?",
      icon: <ExclamationCircleOutlined />,
      onOk: async () => {
        await request.delete(`${ENDPOINT}/${id}`);
        getTeachers();
      },
      okText: "Delete",
      cancelText: "Cancel",
    });
  };

  const state = {
    isModalOpen,
    showModal,
    setIsMarried,
    handleCancel,
    selected,
    editTeacher,
    addTeacher,
    form,
    teachers,
    deleteTeacher,
    setSearch,
    isMarried,
  };
  return (
    <TeacherInfoContext.Provider value={state}>
      {children}
    </TeacherInfoContext.Provider>
  );
};

TeacherContext.propTypes = {
  children: PropTypes.node,
};

export default TeacherContext;
