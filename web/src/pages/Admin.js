import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import classes from "./Admin.module.css";
import { Navigate } from "react-router-dom";
// import { PieChart } from "react-minimal-pie-chart";
// import { Fragment, useEffect, useState } from "react";
// import Cookies from "universal-cookie";
// import { CopyToClipboard } from "react-copy-to-clipboard";

function FormCard({ title, id, level, onPress, copyToClipboard }) {
  const navigate = useNavigate();
  function handleButtonClick(id) {
    navigate(`/admin/${id}`);
  }
  return (
    <div className={classes.cardContainer}>
      <div className={classes.textContainer}>
        <h2 className={classes.nameText}>{title}</h2>
        <p className={classes.dataText}>{level}</p>
      </div>
      <div>
        <button
          onClick={handleButtonClick.bind(this, id)}
          className={classes.showDetailsButton}
        >
          {/* {copied ? "Copied" : "Copy to Clipboard"} */}
          Show Details
        </button>
      </div>
    </div>
  );
}

export default function HomePage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [forms, setForms] = useState([]);
  const navigate = useNavigate();
  const handleClick = () => {
    return navigate("/admin/new-user");
  };
  let data = [
    { title: "One", value: 1, color: "#FFC074" },
    { title: "Two", value: 2, color: "#A2D2FF" },
    { title: "Three", value: 3, color: "#FF9292" },
  ];
  useEffect(() => {
    async function getForms() {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:1234/user-forms/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const responseData = await response.json();
        // console.log(responseData.forms);
        if (!response.ok) {
          setError(responseData.message);
          console.log(responseData.message);
          return;
        }
        setForms(responseData.forms);
      } catch (e) {
        console.log(e);
      } finally {
        console.log("Done");
      }
    }
    getForms();
  }, []);
  return (
    <div className={classes.page}>
      <div className={classes.top}>
        <div className={classes.userInfo}>
          <h1>Welcome user</h1>
          <p>View Forms and create Users</p>
        </div>
        <div className={classes.dp}>{/* <p>{username[0]}</p> */}</div>
      </div>
      <div className="NewUser">
        <button class="Admin_showDetailsButton__aa83D" onClick={handleClick}>
          Create New User
        </button>
      </div>
      <div className={classes.middle}>
        <p>Your Forms</p>
        {/* <button onClick={formAddHandler}>+</button> */}
      </div>

      <hr className={classes.hr} />
      {/* {modal && (
        <>
          <div onClick={toggleModal} className={classes.modal}></div>
          <div className={classes["modal-card"]}>
            <button onClick={logoutHandler}>Log Out</button>
          </div>
        </>
      )} */}
      {/* <div className={classes.Stats}>
        <div className={classes.FormCount}>
          <p> Number of Forms: {data.length}</p>
        </div>

        <div className={classes.FormChart}>
          <PieChart
            animate
            animationDuration={40}
            animationEasing="ease-in"
            center={[50, 110]}
            data={data}
            lineWidth={25}
            lengthAngle={360}
            paddingAngle={0}
            radius={90}
            rounded
            startAngle={0}
            viewBoxSize={[100, 200]}
            labelStyle={{
              fontSize: "8px",
              color: "orange",
              fontWeight: "500",
              fontFamily: "monospace",
            }}
            label={(data) => data.dataEntry.title}
            labelPosition={90}
          />
        </div>
      </div> */}
      <div className={classes.forms}>
        {forms.map((item) => {
          return (
            <FormCard
              key={item.form_id}
              title={item.title}
              id={item.form_id}
              level={item.level}
              //   copyToClipboard={copyToClipboardHandler}
              //   onPress={formDetailsHandler.bind(this, item)}
            />
          );
        })}
      </div>
    </div>
  );
}
