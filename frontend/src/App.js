import React, { useEffect, useState } from "react";
import axios from "axios";

import "./App.scss";
import { Socket, io } from "socket.io-client";

import DayList from "./components/DayList";
import Appointment from "./components/Appointment";

const socket = io("http://localhost:8000");

export default function Application() {
  const [day, setDay] = useState("Monday");
  const [days, setDays] = useState([]);
  const [interviewers, setInterviewers] = useState([]);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/days")
      .then((res) => setDays(res.data))
      .catch((error) =>
        console.log(`something went wrong in get request for days, ${error}`)
      );
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/days/${day}/interviewers`)
      .then((res) => setInterviewers(res.data))
      .catch((error) =>
        console.log(
          `something went wrong in get request for interviewers, ${error}`
        )
      );
  }, [day]);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/days/${day}/appointments`)
      .then((res) => setAppointments(res.data))
      .catch((error) =>
        console.log(
          `something went wrong in get request for appointments, ${error}`
        )
      );
  }, [day]);

  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      console.log("connect!!");
    });

    socket.on("disconnected", () => {
      console.log("disconnected!!");
    });

    // update as needed, it is not good to send/receive the whole appointments
    socket.on("updatedAppointments", (updatedAppointments) => {
      setAppointments(updatedAppointments);
      updateSpots(updatedAppointments)
    });

    return () => {
      socket.disconnect();
      socket.off("connect");
      socket.off("disconnect");
      socket.off("updatedAppointments");
    };
  }, []);

  function updateSpots(dayName, change) {
    setDays((prev) => {
      return prev.map((day) => {
        if (day.name === dayName) {
          return { ...day, spots: day.spots + change };
        }
        return day;
      });
    });
  };

  function bookInterview(id, interview) {
    const existingIndex = appointments.findIndex(
      (appointment) => appointment.id === id
    );
    const isEditing = appointments[existingIndex].interview;

    setAppointments((appointments) => {
      const newAppointment = { ...appointments[existingIndex], interview };
      const copied = [...appointments];
      copied[existingIndex] = newAppointment;
      console.log("appointment is updated")
      socket.emit("updatedAppointments", copied);
      return copied;
    });

    axios
      .put(`http://localhost:8000/api/appointments/${id}/interviews`, {
        interviewer_id: interview.interviewer.id,
        student: interview.student
      })
      .catch((err) => {
        alert("something went wrong please reload your browser");
      });
    if (!isEditing) {
      updateSpots(day, -1);
    }
  }

  function cancelInterview(id) {
    const findAppointmentsIndex = appointments.findIndex(
      (appointments) => appointments.id === id
    );

    setAppointments((prev) => {
      const updatedAppointment = {
        ...prev[findAppointmentsIndex],
        interview: null
      };
      const copied = [...prev];
      copied[findAppointmentsIndex] = updatedAppointment;
      socket.emit("updatedAppointments", copied);
      return copied;
    });

    updateSpots(day, 1);

    const interviewId = appointments[findAppointmentsIndex].interview.id;

    axios
      .delete(`http://localhost:8000/api/interviews/${interviewId}`)
      .catch((err) => {
        alert("something went wrong please reload");
      });
  }

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={days} value={day} onChange={setDay} />
        </nav>
      </section>
      <section className="schedule">
        {Object.values(appointments).map((appointment) => (
          <Appointment
            key={appointment.id}
            interviewers={interviewers}
            {...appointment}
            bookInterview={(interview) =>
              bookInterview(appointment.id, interview)
            }
            cancelInterview={cancelInterview}
          />
        ))}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}