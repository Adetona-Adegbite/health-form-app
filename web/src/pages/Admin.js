import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import classes from "./Admin.module.css";
import { PieChart } from "react-minimal-pie-chart";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import image from "../health.png";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function FormCard({ title, id, level, onPress }) {
  const navigate = useNavigate();
  function handleButtonClick(id) {
    navigate(`/admin/${id}`);
  }
  return (
    <div
      onClick={handleButtonClick.bind(this, id)}
      className={classes.cardContainer}
    >
      <div className={classes.textContainer}>
        <h2 className={classes.nameText}>{title}</h2>
        <p className={classes.dataText}>{level}</p>
      </div>
    </div>
  );
}

export default function HomePage() {
  const [forms, setForms] = useState([]);
  const [highest, setBestHighest] = useState("");
  const [graphData, setGraphData] = useState([]);
  const navigate = useNavigate();

  function getHighestScoringFacility(forms) {
    let highestScore = 0;
    let highestScoreFacility = "";
    console.log("forms", forms);
    for (let i = 0; i < forms.length; i++) {
      const form = forms[i];
      // let formData = JSON.parse(form.form_data);

      // Extracting score from form_data
      let score = form.score;

      // Comparing scores
      if (score > highestScore) {
        highestScore = score;
        highestScoreFacility = form.title;
      }
    }
    console.log(highestScoreFacility);
    setBestHighest(highestScoreFacility);
  }
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Number of Facilities by Level",
      },
    },
    scales: {
      y: {
        type: 'linear',
        ticks: {
          stepSize: 1,
          precision: 0,
        },
      },
    },
  };

  const levelColors = {
    "Level 1": "#DC6ACF",
    "Level 2": "#7DDE92",
    "Level 3": "#276FBF",
    "Level 4": "#F03A47",
    "Level 5": "#FCF300",

    // Add more colors if needed
  };

  // Function to count people in each level and format it
  const countFacilitiesByLevel = (forms) => {
    const levelCounts = {};
    forms.forEach((form) => {
      const level = form.level;
      levelCounts[level] = (levelCounts[level] || 0) + 1;
    });
    return levelCounts;
  };

  const formatDataForBarChart = (levelCounts) => {
    const labels = Object.keys(levelCounts);
    const data = {
      labels: labels,
      datasets: [
        {
          label: "Number of Facilities",
          data: labels.map((level) => levelCounts[level]),
          backgroundColor: [
            "#DC6ACF",
            "#7DDE92",
            "#276FBF",
            "#F03A47",
            "#FCF300",
            // Add more colors if needed
          ],
        },
      ],
    };
    return data;
  };

  // Fetch forms from the server on component mount
  useEffect(() => {
    async function getForms() {
      try {
        const response = await fetch(
          "https://health-form-server.onrender.com/user-forms/",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const responseData = await response.json();
        console.log(responseData.forms);
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setForms(responseData.forms);
        getHighestScoringFacility(responseData.forms);
        // console.log(countPeopleByLevel(responseData.forms));
        setGraphData(
          formatDataForBarChart(countFacilitiesByLevel(responseData.forms))
        );
        console.log(
          formatDataForBarChart(countFacilitiesByLevel(responseData.forms))
        );
        // console.log("graph data", countPeopleByLevel(responseData.forms));
      } catch (error) {
        console.error("Error fetching forms:", error.message);
      }
    }
    getForms();
  }, []);

  // Handle click on "Create New User" button
  const handleCreateNewUser = () => {
    navigate("/admin/new-user");
  };

  return (
    <div className={classes.page}>
      {/* Sidebar */}
      <div className={classes.sidebar}>
        <img style={{ height: "100px" }} src={image} />
        <div className={classes.formsSidebar}>
          <h1>Welcome user</h1>
          <p>View Forms and create Users</p>
          <button
            className={classes.createNewUserButton}
            onClick={handleCreateNewUser}
          >
            Create New User
          </button>
          <p style={{ marginTop: "10%" }}>Your Forms</p>
          <div className={classes.scrollBox}>
            {forms.map((item) => (
              <FormCard
                key={item.form_id}
                title={item.title}
                id={item.form_id}
                level={item.level}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className={classes.mainContent}>
        <h1>Analytics</h1>
        <div className={classes.analysis}>
          <div style={{ height: "60%" }}>
            <p>Levels</p>
            <div>
              <div style={{ height: "100%", width: "100%" }}>
                <Bar data={graphData} options={options} />
              </div>
            </div>
          </div>
          <div style={{ height: "60%" }}>
            <p style={{ position: "relative", top: "10%" }}>Best Facility</p>
            <p
              style={{
                position: "relative",
                top: "25%",
                fontSize: "1.5rem",
                fontWeight: "bolder",
                color: "black",
              }}
            >
              {highest}
            </p>
          </div>
          {/* <div style={{ height: "50%" }}>
            <p style={{ position: "relative", top: "10%" }}>Number of Users</p>
            <p
              style={{
                position: "relative",
                top: "25%",
                fontSize: "2rem",
                fontWeight: "bolder",
                color: "black",
              }}
            >
              39
            </p>
          </div> */}
          <div style={{ height: "50%" }}>
            <p style={{ position: "relative", top: "10%" }}>
              Number of Facilities
            </p>
            <p
              style={{
                position: "relative",
                top: "25%",
                fontSize: "2rem",
                fontWeight: "bolder",
                color: "black",
              }}
            >
              {forms.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
