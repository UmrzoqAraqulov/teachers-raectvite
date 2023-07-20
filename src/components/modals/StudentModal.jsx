import { Checkbox, Form, Input, InputNumber, Modal } from "antd";
import { useContext } from "react";
import { StudentInfoContext } from "../../useContext/StudentContext";

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

const StudentModal = () => {
  const { isModalOpen, handleCancel, selected, form, addStudent } =
    useContext(StudentInfoContext);

  return (
    <Modal
      title={selected ? "Editing Student" : "Adding Student"}
      open={isModalOpen}
      onOk={addStudent}
      okText={selected ? "Save" : "Add"}
      onCancel={handleCancel}
    >
      <Form
        form={form}
        initialValues={{
          student: {
            IsWork: false,
            phoneNumber: "+998",
          },
        }}
        {...layout}
        name="student"
        id="student"
        style={{
          maxWidth: 600,
          paddingTop: "10px",
          position: "relative",
        }}
        validateMessages={validateMessages}
      >
        <Form.Item
          name={["student", "avatar"]}
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
          name={["student", "firstName"]}
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
          name={["student", "lastName"]}
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
          name={["student", "email"]}
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
          name={["student", "age"]}
          label="Age"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item
          name={["student", "phoneNumber"]}
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
          name={["student", "isWork"]}
          valuePropName="checked"
          label="IsWork"
        >
          <Checkbox></Checkbox>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default StudentModal;
