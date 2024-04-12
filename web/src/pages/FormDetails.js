import React, { useLayoutEffect, useState } from "react";
import styles from "./FormDetails.module.css"; // Import CSS module
import { useParams } from "react-router-dom";

// const formData = [
//   {
//     title: "What is the approved name of this network?",
//     response: { option: "Wnsn", value: 0 },
//   },
//   {
//     title:
//       "Does this network have a profile showing the list of facilities, type and ownership?",
//     response: { option: "No", value: 1 },
//   },
//   {
//     title: "Which facility is the hub for the netork?",
//     response: { option: "Ssbh", value: 0 },
//   },
//   {
//     title: "Are all facilities within the network NHIA credentialed?",
//     response: { option: "No", value: 1 },
//   },
//   {
//     title: "Is there a prescriber at the Hub? (Doctor, PA, NP)?",
//     response: { option: "Yes", value: 2 },
//   },
//   {
//     title: "List the number of staff working in this network.",
//     response: { option: "Sna", value: 0 },
//   },
//   {
//     title: "What is the cadre of staff working in this network. ",
//     response: { option: "Nwn", value: 0 },
//   },
//   {
//     title: "Does the hub of the network have a bank account?",
//     response: { option: "Yes", value: 2 },
//   },
//   {
//     title: "How many communities are within this network?",
//     response: { option: "Zbsb", value: 0 },
//   },
//   {
//     title: "What is the total population served by this network?",
//     response: { option: "Shah", value: 0 },
//   },
//   {
//     title: "Is the facility HeFRA Accredited?",
//     response: { option: "Yes, being processed", value: 1 },
//   },
//   {
//     title: "Is the facility NHIA Credentialed?",
//     response: { option: "Yes", value: 2 },
//   },
//   {
//     title: "Is there a staff on call 24 hours",
//     response: { option: "No", value: 1 },
//   },
//   {
//     title: "Does the facility conduct Outreach services?",
//     response: { option: "Yes", value: 2 },
//   },
//   {
//     title:
//       "Does the facility have an emergency tray with appropriate equipment and items for general emergency ward?",
//     response: { option: "Yes", value: 2 },
//   },
//   {
//     title:
//       "Does the facility have Refrigerator/Cold box/Vaccine carrier for storing oxytocin",
//     response: { option: "Yes", value: 2 },
//   },
// ];

const Form = () => {
  const [formDataValues, setFormDataValues] = useState({});
  const [formData, setFormData] = useState({});
  const { formId } = useParams();

  useLayoutEffect(() => {
    async function getFormData() {
      try {
        const response = await fetch(
          `https://health-form-server.onrender.com/get-form/${formId}`,
          {
            method: "GET",
          }
        );
        const responseData = await response.json();
        console.log(responseData.forms[0]);
        if (!response.ok) {
          alert(responseData.message);
          return;
        }
        setFormData(responseData.forms[0]);
        // navigate(`/admin/${id}`, { form: responseData.forms[0] });
      } catch (e) {
        console.log(e);
      } finally {
        console.log("Done");
      }
    }
    getFormData();
  }, []);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    setFormDataValues({
      ...formDataValues,
      [index]: {
        ...formDataValues[index],
        [name]: value,
      },
    });
  };

  return (
    <div className={styles.formContainer}>
      <h1>{formData.title}</h1>
      <p>This facility is in {formData.level}</p>
      {formData &&
        formData.form_data &&
        JSON.parse(formData.form_data).map((question, index) => (
          <div className={styles.questionContainer} key={index}>
            <p className={styles.questionText}>{question.title}</p>
            {question.response.value === 0 ? (
              <input
                className={styles.textInput}
                type="text"
                name={`question_${index}`}
                value={question.response.option || ""}
                onChange={(e) => handleChange(e, index)}
              />
            ) : (
              <div className={styles.radioContainer}>
                <input
                  className={styles.radioInput}
                  type="radio"
                  id={`option_${index}_yes`}
                  name={`question_${index}_radio`}
                  value="Yes"
                  checked={question.response.option === "Yes"}
                  onChange={(e) => handleChange(e, index)}
                />
                <label
                  className={styles.radioLabel}
                  htmlFor={`option_${index}_yes`}
                >
                  Yes
                </label>
                <input
                  className={styles.radioInput}
                  type="radio"
                  id={`option_${index}_no`}
                  name={`question_${index}_radio`}
                  value="No"
                  checked={question.response.option !== "Yes"}
                  onChange={(e) => handleChange(e, index)}
                />
                <label
                  className={styles.radioLabel}
                  htmlFor={`option_${index}_no`}
                >
                  No
                </label>
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

export default Form;
