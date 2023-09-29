import React from "react";
import InterviewerList from "../InterviewerList";
import Button from "../Button";

const Form = (props) => {
  const [name, setName] = React.useState(props.student || "");
  const [interviewer, setInterviewer] = React.useState(
    props.interviewer || null
  );
  const reset = () => {
    setName("");
    setInterviewer(null);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name || !interviewer) return;
    props.onSave(name, interviewer);
  };
  const cancel = () => {
    reset();
    props.onCancel();
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required={true}
          />
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer && interviewer.id}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>
            Cancel
          </Button>
          <Button confirm onClick={handleSubmit}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
};

export default Form;
