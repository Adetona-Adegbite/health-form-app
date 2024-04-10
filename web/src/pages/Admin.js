// import { useNavigate } from "react-router-dom";
import classes from "./Admin.module.css";
import { PieChart } from "react-minimal-pie-chart";
// import { Fragment, useEffect, useState } from "react";
// import Cookies from "universal-cookie";
// import { CopyToClipboard } from "react-copy-to-clipboard";

function FormCard({ title, id, onPress, copyToClipboard }) {
  return (
    <div className={classes.cardContainer}>
      <div className={classes.textContainer}>
        <h2 className={classes.nameText}>{title}</h2>
        <p className={classes.dataText}>{id}</p>
      </div>
      <div>
        <button
          //   onClick={handleButtonClick}
          className={classes.showDetailsButton}
        >
          {/* {copied ? "Copied" : "Copy to Clipboard"} */}
          Copy to Clipboard
        </button>
      </div>
    </div>
  );
}

export default function HomePage() {
  let data = [
    { title: "One", value: 1, color: "#FFC074" },
    { title: "Two", value: 2, color: "#A2D2FF" },
    { title: "Three", value: 3, color: "#FF9292" },
  ];

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
        <button class="Admin_showDetailsButton__aa83D">Create New User</button>
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
      <div className={classes.Stats}>
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
      </div>
      <div className={classes.forms}>
        {data.map((item) => {
          return (
            <FormCard
              key={item.id}
              title={item.title}
              id={item.id}
              //   copyToClipboard={copyToClipboardHandler}
              //   onPress={formDetailsHandler.bind(this, item)}
            />
          );
        })}
      </div>
    </div>
  );
}
