import React, { useEffect, useState, useRef } from "react";
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
  const [refSelect, setRefSelect] = useState([]);
  let tableData = null;
  const baseURL = "http://localhost:4000/posts/1";
  const [post, setPost] = useState(null);
  const [childNum, setChildNum] = useState(0);
  const mytable = useRef(null);

  useEffect(() => {
    axios.get(baseURL).then((response) => {
      setPost(JSON.stringify(response.data.child));
    });
  });
  function getObjects(obj, key, val, newVal) {
    var newValue = newVal;
    var objects = [];
    for (var i in obj) {
      // console.log("--->" + i + "--" + key);
      if (!obj.hasOwnProperty(i)) continue;
      if (typeof obj[i] == "object") {
        objects = objects.concat(getObjects(obj[i], key, val, newValue));
      } else if (i == key && obj[key] == val) {
        setChildNum(obj.child.length + 1);
        obj.child.push(newValue);
      }
    }
    return obj;
  }
  // console.log(post);
  if (!post) return <h1>Loading...</h1>;
  let tempArr = JSON.parse(post);
  const handleSubmit = (e) => {
    e.preventDefault();

    let newUser = {
      name: `${name}`,
      role: `${role}`,
      exp: `${exp}`,
      refid: `${refid}`,
      id: `${refid}_u${childNum}`,
      child: [],
    };

    let newTempArr = getObjects(tempArr, "id", refid, newUser);

    // let obj2 = null;
    const baseURL = "http://localhost:4000/posts/1";
    var obj = {
      id: 1,
      name: "JoinPath123",
      child: [],
    };
    obj.child = newTempArr;

    axios.put(baseURL, obj).then((response) => {
      //   setPost(response.data);
      // console.log(response.data);
      setPut(JSON.stringify(response.data));
    });
  };

  // console.log(tempArr[0]);

  let addData = (tempArr, id) => {
    // console.log(id + "I am from TEmpArr:" + JSON.stringify(tempArr));
    arr.push(
      tempArr.map((element, index) => {
        if (element.child.length > 0) {
          addData(element.child, id);
        }
        setRefSelect(
          refSelect.push({
            id: element.id,
            name: element.name + "-" + element.role,
          })
        );

        let obj = {};

        obj.id = id + "_" + element.id;
        obj.name = element.name;
        obj.role = element.role;
        obj.exp = element.exp;
        obj.refid = element.refid;
        obj.email = element.email;

        return obj;
      })
    );
    // tableData.push(arr);
  };

  let refOpt = [];
  // console.log("refselect:" + refSelect);
  if (refSelect.length > 0)
    refOpt = refSelect.map((item, index) => {
      return <option value={item.id}>{item.name}</option>;
    });
  // // setData(data + 1);
  // console.log(refOpt);
  if (refSelect == 0) temp = 0;
  if (temp == 0) {
    // console.log("tempValue:" + temp);
    addData(tempArr, "parent");
    temp++;
  }

  arr = arr.flat();

  arr.sort((a, b) => {
    if (a.id < b.id) {
      return -1;
    } else if (a.id > b.id) {
      return 1;
    } else return 0;
  });

  // console.log("I am here");
  // console.log(arr);
  let arra = [];
  arra = arr.map((element, index) => {
    return (
      <tr key={index}>
        <td>{index}</td>
        <td>{element.id}</td>
        <td>{element.name}</td>
        <td>{element.role}</td>
        <td>{element.exp}</td>
        <td>{element.refid}</td>
        {/* <td>{element.email}</td> */}
      </tr>
    );
  });
  // console.log(arra);
  return (
    <div>
      <form style={{ width: "50%", margin: "auto" }}>
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

          <select
            className="form-select"
            value={refid}
            onChange={(e) => setRefId(e.target.value)}
          >
            <option value="">--None--</option>
            {refOpt}
          </select>
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
        <tbody ref={mytable}>{arra}</tbody>
      </table>
    </div>
  );
}
