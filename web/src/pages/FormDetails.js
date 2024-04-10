import classes from "./FormDetails.module.css";
const FormDetails = () => {
  return (
    <div className={classes.TierForm}>
      <h2 className={classes.h2}>Hospital Review Form</h2>
      <div className={classes.container}>
        
        <br />
        <form className={classes.form}>
          <label>
            Name:
            <input type="text" />
          </label>
          <br />
          <label>
            Age:
            <input type="number" />
          </label>
          <br />
          <label>
            Visit Date:
            <input type="date" />
          </label>
          <br />
          <label>
            Clinic Name:
            <input type="text" />
          </label>
          <br />
          <label>
            <p>Rating</p>
            <input type="radio" value="Tier 1" defaultChecked />
            Tier 1
          </label>
          <br />
          <label>
            <input type="radio" value="Tier 2" />
            Tier 2
          </label>
          <br />
          <label>
            <input type="radio" value="Tier 3" />
            Tier 3
          </label>
          <br />
          <br />
          <label>
            <p>Comments:</p>
            <textarea />
          </label>
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default FormDetails;
