import React from "react";
import InterviewerListItem from "./InterviewerListItem";

import "./InterviewerList.scss";

const InterviewerList = (props) => {
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {props.interviewers.map((interviewerItem) => {
          return (
            <InterviewerListItem
              key={interviewerItem.id}
              name={interviewerItem.name}
              avatar={interviewerItem.avatar}
              selected={interviewerItem.id === props.value}
              setInterviewer={() => props.onChange(interviewerItem)}
            />
          );
        })}
      </ul>
    </section>
  );
};

export default InterviewerList;
