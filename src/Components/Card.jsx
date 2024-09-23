import React from "react";
// all employee profile images imported
import profile from "../assets/profile.png";
import profile1 from "../assets/profile1.png";
import profile4 from "../assets/profile4.jpeg";
import profile5 from "../assets/profile5.jpeg";
import profile6 from "../assets/profile6.png";
import profile7 from "../assets/profile7.png";

// Card component
// This component is used to display the card of each task in the dashboard
const Card = ({
  id, // task id
  title, // task title
  tag, // task tags
  userId, // user id
  userData, // user data
  // Below are the props for grouping and ordering which are majorly used for sorting and filtering tasks
  status, // task status
  priority, // task priority
  grouping, // grouping of tasks
  ordering, // ordering of tasks
  statusMapping, // status mapping
}) => {
  const user = userData.find((user) => user.id === userId);

  return (
    <div className="card">
      <div className="card-header">
        <div className="status-heading">
         {/* Here we are checking the grouping of tasks and displaying the status of the task based on the grouping */}
          {grouping === "users" || grouping === "priority" ? (
            // Here we are checking the status of the task and displaying the status icon based on the status
            statusMapping[id] === "Todo" ? (
              <i className="bx bx-circle" id="todo"></i>
            ) : statusMapping[id] === "In progress" ? (
              <i className="bx bx-adjust" id="progress"></i>
            ) : statusMapping[id] === "Backlog" ? (
              <i className="bx bx-task-x" id="backlog"></i>
            ) : statusMapping[id] === "Done" ? (
              <i className="bx bxs-check-circle" id="done"></i>
            ) : (
              <i className="bx bxs-x-circle" id="cancel"></i>
            )
          ) : null}

          {/* <p>{status}</p> Displaying the status of the task */}
  

          <p>{id}</p> {/* Displaying the task id */}
        </div>
        {/* here we are checking the grouping of tasks and displaying the user avatar based on the grouping */}
        {grouping !== "users" ? (
          <div
            className={
              user && !user.available
                ? "user-avatar-unavailable"
                : "user-avatar"
            }
          >
          
            <img
              src={
                userId === "usr-1"
                  ? profile1
                  : userId === "usr-2"
                  ? profile6
                  : userId === "usr-3"
                  ? profile7
                  : userId === "usr-4"
                  ? profile5
                  : userId === "usr-5"
                  ? profile4
                  : profile
              }
              // Here we are checking the user availability and displaying the user avatar based on the availability
              className={
                user && !user.available
                  ? "user-avatar-unavailable"
                  : "user-avatar"
              }
              alt="user"
            />
          </div>
        ) : null}
        
      </div>
      <div className="card-title">
        <p>{title}</p>
      </div>
      {/* card footer to display the priority and tags of the task */}
      <div className="card-footer">
        {grouping !== "priority" ? (
          <div className="feature-container">
            {priority === "0" ? (
              <i className="bx bx-dots-horizontal-rounded"></i>
            ) : priority === "1" ? (
              <i className="bx bx-signal-2"></i>
            ) : priority === "2" ? (
              <i className="bx bx-signal-3"></i>
            ) : priority === "3" ? (
              <i className="bx bx-signal-4"></i>
            ) : (
              <i className="bx bxs-message-square-error"></i>
            )}
          </div>
        ) : null}
        {/* Here we are checking the grouping of tasks and displaying the tags of the task based on the grouping */}
        {tag?.map((value, index) => (
          <div className="feature-container" key={index}>
            <div className="alert-icon"></div>
            <div className="feature-request">{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
