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
  const mytable = useRef(null);
  let arra = [];
  useEffect(() => {
    axios.get(baseURL).then((response) => {
      setPost(JSON.stringify(response.data.child));
    });
  }, [post]);
  function getObjects(obj, key, val, newVal, operation) {
    // alert("searchkey:" + val);
    var newValue = newVal;
    var objects = [];
    for (var i in obj) {
      // console.log("--->" + i + "--" + key);
      if (!obj.hasOwnProperty(i)) continue;
      if (typeof obj[i] == "object") {
        objects = objects.concat(
          getObjects(obj[i], key, val, newValue, operation)
        );
      } else if (i == key && obj[key] == val) {
        if (operation == "create") {
          // alert("childlength:" + obj.child.length);
          //setChildNum(obj.child.length + 1);
          newValue.id = refid + "_u" + (obj.child.length + 1);
          // alert("newid:" + newValue.id);
          obj.child.push(newValue);
        }
        if (operation == "update") {
          obj.name = newValue.name;
          // obj.id = newValue.id;
          obj.email = newValue.email;
          obj.refid = refid;
          obj.exp = newValue.exp;
          obj.role = newValue.role;
          // alert(obj.id);
        }
      }
    }
    return obj;
  }
  // console.log(post);
  if (!post) return <h1>Loading...</h1>;
  let tempArr = JSON.parse(post);
  const handleSubmit = (e, operation) => {
    e.preventDefault();

    let newUser = {
      name: `${name}`,
      role: `${role}`,
      exp: `${exp}`,
      refid: `${refid}`,
      email: `${email}`,
      child: [],
    };

    let searchid = refid;
    if (operation == "update") {
      searchid = id.split("parent_")[1];
    }

    // alert("searchid:" + searchid);
    let newTempArr = getObjects(tempArr, "id", searchid, newUser, operation);

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
      setName("");
      setRole("");
      setExp("");
      setId("");
      setRefId(1);
      setEmail("");
      temp = 0;
      arra = [];
      setPost(null);
      tempArr = null;

      alert("Data " + operation + " successfully.");
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

  let editForm = (e, eid, ename, erole, eexp, erefid, eemail) => {
    setName(ename);
    setRole(erole);
    setExp(eexp);
    setId(eid);
    setRefId(erefid);
    setEmail(eemail);
  };

  // console.log("I am here");
  // console.log(arr);

  arra = arr.map((element, index) => {
    return (
      <tr key={index}>
        <td style={{ background: "green", width: "5px" }}>
          <a href="#teamHead">
            <div
              className="form-check"
              onClick={(e) =>
                editForm(
                  e,
                  element.id,
                  element.name,
                  element.role,
                  element.exp,
                  element.refid,
                  element.email
                )
              }
            >
              <i
                className="fa fa-pencil text-center"
                style={{ color: "white" }}
              ></i>
            </div>
          </a>
        </td>
        <td style={{ background: "#51a0c9" }}>{index}</td>
        <td style={{ background: "#51a0c9 " }}>{element.id}</td>
        <td style={{ background: "#51a0c9 " }}>{element.name}</td>
        <td style={{ background: "#51a0c9" }}>{element.role}</td>
        <td style={{ background: "#51a0c9 " }}>{element.exp}</td>
        <td style={{ background: "#51a0c9" }}>{element.refid}</td>
        <td style={{ background: "#51a0c9" }}>{element.email}</td>
      </tr>
    );
  });
  // console.log(arra);
  return (
    <div style={{ background: "lightgray" }}>
      <h1 style={{ textAlign: "center" }} id="teamHead">
        Create/Update the Team information
      </h1>
      <br></br>
      <form style={{ width: "50%", margin: "auto" }}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">
            <h3>Full Name</h3>
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-describedby="emailHelp"
            placeholder="Enter fullname"
            autocomplete="off"
          />
          <br />
          <label htmlFor="exampleInputEmail1">
            <h3>Role</h3>
          </label>
          <input
            type="text"
            className="form-control"
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Enter role"
            autocomplete="off"
          />
          <br />
          <label htmlFor="exampleInputEmail1">
            <h3>Experience</h3>
          </label>
          <input
            type="text"
            className="form-control"
            id="exp"
            value={exp}
            onChange={(e) => setExp(e.target.value)}
            placeholder="Enter total experience"
            autocomplete="off"
          />
          <br />
          <label htmlFor="exampleInputEmail1">
            <h3>User ID</h3>
          </label>
          <input
            type="text"
            className="form-control"
            id="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
            autocomplete="off"
          />
          <br />
          <label htmlFor="exampleInputEmail1">
            <h3>Referal Id</h3>
          </label>

          <select
            className="form-select"
            value={refid}
            onChange={(e) => setRefId(e.target.value)}
          >
            <option value="1">--None--</option>
            {refOpt}
          </select>
          <br />
          <label htmlFor="exampleInputEmail1">
            <h3>Email address</h3>
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-describedby="emailHelp"
            placeholder="Enter email"
            autocomplete="off"
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
            handleSubmit(e, "create");
          }}
        />{" "}
        <input
          className="btn btn-primary"
          type="button"
          value="Update Info"
          onClick={(e) => {
            handleSubmit(e, "update");
          }}
        />
      </form>

      <table
        className="table table-hover table-dark mt-5"
        style={{ width: "80%", margin: "auto", marginBottom: "100px" }}
      >
        <thead>
          <tr>
            <th scope="col" style={{ background: "#3058a5" }}>
              Edit
            </th>
            <th scope="col" style={{ background: "#3058a5" }}>
              S.No.
            </th>
            <th scope="col" style={{ background: "#3058a5" }}>
              UserID
            </th>
            <th scope="col" style={{ background: "#3058a5" }}>
              Name
            </th>
            <th scope="col" style={{ background: "#3058a5" }}>
              Role
            </th>
            <th scope="col" style={{ background: "#3058a5" }}>
              Experience
            </th>
            <th scope="col" style={{ background: "#3058a5" }}>
              Ref ID
            </th>
            <th scope="col" style={{ background: "#3058a5" }}>
              Email
            </th>
          </tr>
        </thead>
        <tbody ref={mytable}>{arra}</tbody>
      </table>
    </div>
  );
}
