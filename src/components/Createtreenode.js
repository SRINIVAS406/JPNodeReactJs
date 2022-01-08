// import React from "react";
// import axios from "axios";

// export default function CreateTreeNode() {
//   const [name, setName] = React.useState("");
//   const [role, setRole] = React.useState("");
//   const [exp, setExp] = React.useState("");
//   const [id, setId] = React.useState("");
//   const [refid, setRefId] = React.useState("");
//   const [email, setEmail] = React.useState("");
//   const [put, setPut] = React.useState(null);
//   //   const [post, setPost] = React.useState(null);
//   let post = {};
//   const baseURL = "http://localhost:4000/posts/1";
//   React.useEffect(() => {
//     axios.get(baseURL).then((response) => {
//       post = response.data;
//     });
//   });

//   if (!post) return null;
//   console.log(post);
//   const handleSubmit = (e) => {
//     console.log("form submitted");
//     let obj2 = null;
//     const baseURL = "http://localhost:4000/posts/2";
//     var newUser = post;
//     axios.put(baseURL, newUser).then((response) => {
//       //   setPost(response.data);
//       console.log(response.data);
//       // setPut(response.data)
//     });

//     if (!put) return null;

//     console.log("data has been submitted");

//     e.preventDefault();
//     // ???
//   };

//   let tableData = [];
//   let tempArr = post.child;
//   let arr = [];

//   console.log(tempArr);

//   let addData = (tempArr) => {
//     console.log("I am from TEmpArr:" + tempArr);
//     arr = tempArr.map((element) => {
//       // if (element.child.length > 1) {
//       //   for (let i = 0; i < element.child.length; i++)
//       //     addData(element.child[i]);
//       // } else {
//       console.log(element.id);
//       return (
//         <tr>
//           <td>{element.id}</td>
//           <td>{element.name}</td>
//           <td>{element.role}</td>
//           <td>{element.exp}</td>
//           <td>{element.refid}</td>
//           {/* <td>{element.email}</td> */}
//         </tr>
//       );
//     });
//     tableData.concat(arr);
//   };

//   addData(tempArr);

//   // tableData = post.child.map((element) => { });
//   return (
//     <div>
//       <form style={{ width: "50%", margin: "auto" }}>
//         <h1>{put}</h1>
//         <div className="form-group">
//           <label htmlFor="exampleInputEmail1">Full Name</label>
//           <input
//             type="text"
//             className="form-control"
//             id="name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             aria-describedby="emailHelp"
//             placeholder="Enter fullname"
//           />
//           <br />
//           <label htmlFor="exampleInputEmail1">Role</label>
//           <input
//             type="text"
//             className="form-control"
//             id="role"
//             value={role}
//             onChange={(e) => setRole(e.target.value)}
//             placeholder="Enter role"
//           />
//           <br />
//           <label htmlFor="exampleInputEmail1">Experience</label>
//           <input
//             type="text"
//             className="form-control"
//             id="exp"
//             value={exp}
//             onChange={(e) => setExp(e.target.value)}
//             placeholder="Enter total experience"
//           />
//           <br />
//           <label htmlFor="exampleInputEmail1">User ID</label>
//           <input
//             type="text"
//             className="form-control"
//             id="id"
//             value={id}
//             onChange={(e) => setId(e.target.value)}
//           />
//           <br />
//           <label htmlFor="exampleInputEmail1">Referal Id</label>
//           <input
//             type="text"
//             className="form-control"
//             id="refid"
//             value={refid}
//             onChange={(e) => setRefId(e.target.value)}
//             placeholder="Enter referal id"
//           />
//           <br />
//           <label htmlFor="exampleInputEmail1">Email address</label>
//           <input
//             type="email"
//             className="form-control"
//             id="email"
//             onChange={(e) => setEmail(e.target.value)}
//             aria-describedby="emailHelp"
//             placeholder="Enter email"
//           />

//           <small id="emailHelp" className="form-text text-muted">
//             We'll never share your email with anyone else.
//           </small>
//           <br />
//         </div>
//         <br />
//         <input
//           className="btn btn-primary"
//           type="button"
//           value="Add Friend"
//           onClick={(e) => {
//             handleSubmit(e);
//           }}
//         />
//       </form>

//       <table
//         className="table table-hover table-dark mt-5"
//         style={{ width: "80%", margin: "auto" }}
//       >
//         <thead>
//           <tr>
//             <th scope="col">S.No.</th>
//             <th scope="col">UserID</th>
//             <th scope="col">Name</th>
//             <th scope="col">Role</th>
//             <th scope="col">Experience</th>
//             <th scope="col">Ref ID</th>
//             <th scope="col">Email</th>
//           </tr>
//         </thead>
//         <tbody>{tableData}</tbody>
//       </table>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import axios from "axios";
let arr = [];
let temp = 0;
export default function CreateTreeNode() {
  const [name, setName] = React.useState("");
  const [role, setRole] = React.useState("");
  const [exp, setExp] = React.useState("");
  const [id, setId] = React.useState("");
  const [refid, setRefId] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [put, setPut] = React.useState(null);
  let tableData = null;
  const baseURL = "http://localhost:4000/posts/1";
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios.get(baseURL).then((response) => {
      setPost(JSON.stringify(response.data.child));
    });
  });
  // console.log(post);
  if (!post) return <h1>Loading...</h1>;
  const handleSubmit = (e) => {
    return null;
    // console.log("form submitted");
    // let obj2 = null;
    // const baseURL = "http://localhost:4000/posts/2";
    // var newUser = post;
    // axios.put(baseURL, newUser).then((response) => {
    //   //   setPost(response.data);
    //   console.log(response.data);
    // setPut(response.data)
  };

  let tempArr = JSON.parse(post);

  // console.log(tempArr[0]);

  let addData = (tempArr, id) => {
    console.log(id + "I am from TEmpArr:" + JSON.stringify(tempArr));
    arr.push(
      tempArr.map((element, index) => {
        if (element.child.length > 0) {
          addData(element.child);
        }
        return (
          <tr key={index}>
            <td>{element.id}</td>
            <td>{element.name}</td>
            <td>{element.role}</td>
            <td>{element.exp}</td>
            <td>{element.refid}</td>
            {/* <td>{element.email}</td> */}
          </tr>
        );
      })
    );
    // tableData.push(arr);
  };

  // console.log("srinivas:" + arr.length);
  // // setData(data + 1);
  // console.log("srinivas1:" + data);
  if (temp == 0) {
    console.log("tempValue:" + temp);
    addData(tempArr);
    temp++;
  }
  console.log("I am above data");
  console.log(arr.flat());
  return (
    <div>
      <form style={{ width: "50%", margin: "auto" }}>
        <h1>{put}</h1>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Full Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-describedby="emailHelp"
            placeholder="Enter fullname"
          />
          <br />
          <label htmlFor="exampleInputEmail1">Role</label>
          <input
            type="text"
            className="form-control"
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Enter role"
          />
          <br />
          <label htmlFor="exampleInputEmail1">Experience</label>
          <input
            type="text"
            className="form-control"
            id="exp"
            value={exp}
            onChange={(e) => setExp(e.target.value)}
            placeholder="Enter total experience"
          />
          <br />
          <label htmlFor="exampleInputEmail1">User ID</label>
          <input
            type="text"
            className="form-control"
            id="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <br />
          <label htmlFor="exampleInputEmail1">Referal Id</label>
          <input
            type="text"
            className="form-control"
            id="refid"
            value={refid}
            onChange={(e) => setRefId(e.target.value)}
            placeholder="Enter referal id"
          />
          <br />
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />

          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
          <br />
        </div>
        <br />
        <input
          className="btn btn-primary"
          type="button"
          value="Add Friend"
          onClick={(e) => {
            handleSubmit(e);
          }}
        />
      </form>

      <table
        className="table table-hover table-dark mt-5"
        style={{ width: "80%", margin: "auto", marginBottom: "100px" }}
      >
        <thead>
          <tr>
            <th scope="col">S.No.</th>
            <th scope="col">UserID</th>
            <th scope="col">Name</th>
            <th scope="col">Role</th>
            <th scope="col">Experience</th>
            <th scope="col">Ref ID</th>
            <th scope="col">Email</th>
          </tr>
        </thead>
        <tbody>{arr}</tbody>
      </table>
    </div>
  );
}
