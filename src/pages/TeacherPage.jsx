import { Button, Select } from "antd";
import Search from "antd/es/input/Search";
import { ISMARRIED } from "../const/const";
import { useContext } from "react";
import './index.scss'
import { TeacherInfoContext } from "../useContext/TeacherContext";
import TeacherModal from "../components/modals/TeacherModal";
import CardTeacher from "../components/card/CardTeacher";

const TeacherPage = () => {
  const { showModal,teachers, setSearch, isMarried,setIsMarried } = useContext(TeacherInfoContext);

  const onSearch = (value) => {
    let searchText = value.target.value;
    if (searchText){
      setSearch(searchText)
    }else{
      setSearch("");
    }
  };

   const onIsMarriedChange = (value) => {
     setIsMarried(value);
   };

  return (
    <div>
      <div className="navBar">
        <h2 style={{ color: "black" }} className="title">
          Teachers
        </h2>
        <Search
          placeholder="input search text"
          onSearch={onSearch}
          onChange={onSearch}
          enterButton
          style={{
            width: 400,
          }}
        />
        <Select
          style={{
            width: 120,
          }}
          value={isMarried}
          onChange={onIsMarriedChange}
          options={ISMARRIED.map((el) => ({
            label: el,
            value: el === "Married" ? true : el === "Single" ? false : el,
          }))}
        />
        <Button type="primary" onClick={showModal}>
          Add Teacher
        </Button>
        <TeacherModal />
      </div>
      <div className="card-row">
        {teachers.map((el) => (
          <CardTeacher key={el.id} {...el} />
        ))}
      </div>
    </div>
  );
}

export default TeacherPage