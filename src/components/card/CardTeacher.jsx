import { Card } from "antd";
import Meta from "antd/es/card/Meta";
import PropTypes from "prop-types";

import {
  EditOutlined,
  EllipsisOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import './card.scss'
import { useContext } from "react";
import { TeacherInfoContext } from "../../useContext/TeacherContext";
import { useNavigate } from "react-router-dom";
import { StudentInfoContext } from "../../useContext/StudentContext";

const CardTeacher = ({ id,avatar, firstName, lastName, email, phoneNumber,isMarried }) => {
  const navigate = useNavigate();
  const { editTeacher, deleteTeacher } = useContext(TeacherInfoContext);
  const {setTeacherId} = useContext(StudentInfoContext);

  const viewStudents = (id) =>{
    navigate('/students')
    localStorage.setItem("id",id);
    setTeacherId(id);
  }
  return (
    <Card
      className="card"
      style={{ width: "100%" }}
      cover={<img style={{ height: 250 }} alt="teacher img" src={avatar} />}
      actions={[
        <EditOutlined
          onClick={() => editTeacher(id)}
          key="edit"
          style={{ color: "green", fontSize: "20px" }}
        />,
        <DeleteOutlined
          onClick={() => deleteTeacher(id)}
          key="del"
          style={{ color: "red", fontSize: "20px" }}
        />,
        <EllipsisOutlined
          onClick={()=>viewStudents(id)}
          key="ellipsis"
          style={{ color: "blue", fontSize: "22px" }}
        />,
      ]}
    >

      <Meta
        title={<h2 className="titleCard">{firstName + " " + lastName}</h2>}
        description={
          <div className="desc">
            <p>
              <span>Email:</span>
              {email}
            </p>
            <p>
              <span>Phone:</span>
              {phoneNumber}
            </p>
            <p>
              <span>isMarried:</span>
              {isMarried?"✅":"❌"}
            </p>
          </div>
        }
      />
    </Card>
  );
};

CardTeacher.propTypes = {
  id:PropTypes.string,
  avatar:PropTypes.string,
  firstName:PropTypes.string,
  lastName:PropTypes.string,
  email:PropTypes.string,
  phoneNumber:PropTypes.string,
  isMarried:PropTypes.bool,
};

export default CardTeacher;
