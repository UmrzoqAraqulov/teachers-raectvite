import axios from "axios";

export const ISMARRIED = ["All","Married","Single"];
export const ORDERAGE = ["OrderAge","Increase","Dicrease"];
export const TEACHERS = [];
export const ENDPOINT =
  "https://6490bc9e1e6aa71680cbb786.mockapi.io/TeachersInfo/teacher";

try{
  axios.get(ENDPOINT).then(({data})=>{
    data.map((teacher)=>{
      TEACHERS.push({name:teacher.firstName,id:teacher.id});
    })
  })
}catch(err){
  console.log(err);
}
