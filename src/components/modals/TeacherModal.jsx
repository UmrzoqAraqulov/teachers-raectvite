import { Checkbox, Form, Input, Modal } from "antd";
import { useContext } from "react";
import { TeacherInfoContext } from "../../useContext/TeacherContext";

const layout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 16,
  },
};

const validateMessages = {
  required: "Please fill our${label}",
  types: {
    email: "${label} is not a valid email!",
    url: "${label} is not a valid url!",
  },
};

const TeacherModal = () => {
  const { isModalOpen, handleCancel, selected, form, addTeacher } =
    useContext(TeacherInfoContext);

  return (
    <Modal
      title={selected ? "Editing Teacher" : "Adding Teacher"}
      open={isModalOpen}
      onOk={addTeacher}
      okText={selected ? "Save" : "Add"}
      onCancel={handleCancel}
    >
      <Form
        form={form}
        initialValues={{
          teacher: {
            isMarried: false,
            phoneNumber: "+998",
          },
        }}
        {...layout}
        name="teacher"
        id="teacher"
        style={{
          maxWidth: 600,
          paddingTop: "10px",
          position: "relative",
        }}
        validateMessages={validateMessages}
      >
        <Form.Item
          name={["teacher", "avatar"]}
          label="ImgUrl"
          rules={[
            {
              type: "url",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["teacher", "firstName"]}
          label="FirstName"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["teacher", "lastName"]}
          label="LastName"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["teacher", "email"]}
          label="Email"
          rules={[
            {
              type: "email",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["teacher", "groups"]}
          label="Groups"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name={["teacher", "phoneNumber"]}
          label="Phone"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name={["teacher", "isMarried"]}
          valuePropName="checked"
          label="IsMarried"
        >
          <Checkbox></Checkbox>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TeacherModal;
