import { Button, Select } from "antd";
import Search from "antd/es/input/Search";
import { ORDERAGE, TEACHERS } from "../const/const";
import { useContext } from "react";
import "./index.scss";
import StudentModal from "../components/modals/StudentModal";
import CardStudent from "../components/card/CardStudent";
import { StudentInfoContext } from "../useContext/StudentContext";

const StudnetsPage = () => {
  const {
    showModal,
    students,
    setSearch,
    orderAge,
    teacherChange,
    setOrderAge,
    setTeacherId,
    setTeacherChange,
    teachersInfo,
  } = useContext(StudentInfoContext);

  const onSearch = (value) => {
    let searchText = value.target.value;
    if (searchText) {
      setSearch(searchText);
    } else {
      setSearch("");
    }
  };

  const onOrderAgeChange = (value) => {
    console.log(value);
    setOrderAge(value);
  };
  const onTeacherChange = (value) => {
    setTeacherChange(value);
    let id = teachersInfo.filter((el) => el.firstName === value)[0].id;
    setTeacherId(id);
  };

  return (
    <div>
      <div className="navBar">
        <h2 style={{color:"black"}} className="title">Students</h2>
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
          value={teacherChange}
          onChange={onTeacherChange}
          options={TEACHERS.map(({ name }) => ({
            label: name,
            value: name,
          }))}
        />
        <Select
          style={{
            width: 120,
          }}
          value={orderAge}
          onChange={onOrderAgeChange}
          options={ORDERAGE.map((el) => ({
            label: el,
            value: el,
          }))}
        />
        <Button type="primary" onClick={showModal}>
          Add Student
        </Button>
        <StudentModal />
      </div>
      <div className="card-row">
        {students.map((el) => (
          <CardStudent key={el.id} {...el} />
        ))}
      </div>
    </div>
  );
};

export default StudnetsPage;
