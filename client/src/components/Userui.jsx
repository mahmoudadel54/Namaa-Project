import React, {useState ,useEffect} from 'react';
import MaterialTable, { MTableCell } from 'material-table';
import axios from 'axios';
const client= axios.create ();
client.interceptors.response.use(res=>res,err=>{
  throw new Error(err.response.data.message)
})
export default function MaterialTableDemo() {

  //const [err,setErr] = useState({})
  const [state, setState] = useState({
    columns: [
      { title: 'Name', field: 'name' },
      { title: 'User Name', field: 'username' },
      { title: 'Password', field: 'password' },
      {
        title: 'User role',
        field: 'role',
        
        
      },
    ],
    data: [
     
    ],
  });
  // if(err!={}){alert(err);}
  //console.log(err);
  const token= localStorage.getItem("token")
localStorage.setItem(
  "token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWQ1YmNiOTM3ZWQzZmIxZWM4NTg1NDciLCJpYXQiOjE1OTExODk2NTksImV4cCI6MTU5MTE5MzI1OX0.jEHkFE0bFfhtgDQwgodBFGnODrMBs11-zS7qdIz0Lu4")
const headers= {Authorization:token}
  useEffect(() => {
  
    const fetchData = async () => {
      const result = await axios.get(
        '/users/', {headers}
        
      );
 if (!{headers}){
      alert(result.data.message)
      
 }
      //console.log(result.data.message)
      setState({columns: state.columns,
    data: result.data});
    };
 
    fetchData();
  }, []);

  async function addUser (newuser){
 const result = await axios.post(
   '/users/register',newuser,{headers}
 )
 alert(result.data.message)
 ///console.log(result.data.message)
 setState({columns: state.columns,
data:[...state.data , result.data]});
};

async function deleteUser (id){
 
const result = await axios.delete(
 `users/${id}`,{headers}
);
alert(result.data.message)
console.log(result.data)
setState({columns: state.columns,
  data: result.data});
};

 async function editUser (id,editedUser){
 
  const result =  await axios.patch(
   `users/${id}`,editedUser,{headers}
  )
  alert(result.data.message)
//  if(result.data.message!={}){
//    setErr(result.data.message);
   
//  }
 
  setState({columns: state.columns,
    data: result.data})
  
  }

  return (
    <MaterialTable
      title="Users"
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve) => {
           
              resolve();
              addUser(newData);
              // setState((prevState) => {
              //   const data = [...prevState.data];
              //   data.push(newData);
              //   return { ...prevState, data };
              // });
            
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            
           
              const id= oldData._id
              resolve();
              
              // if (newData.password==""||newData.name==""||newData.username==""||newData.role==""){
              // alert("menna")
              // }
              
              editUser(id,newData,oldData)
              // if (oldData) {
              //   setState((prevState) => {
              //     const data = [...prevState.data];
              //     data[data.indexOf(oldData)] = newData;
              //     console.log(MTableCell)
              //     return { ...prevState, data };
              //   });
              // }
           
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            
              const id= oldData._id
              resolve();
             
              deleteUser(id,oldData)
              // setState((prevState) => {
              //   const data = [...prevState.data];
              //   data.splice(data.indexOf(oldData), 1);
              //   return { ...prevState, data };
              // });
           
          }),
      }}
    />
  );
}


 