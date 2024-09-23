// First i imported the images and then used them in the JSX to display the user avatar
// I also used the statusMapping to display the status of the task based on the grouping
// and also used the grouping prop to display the user avatar based on the grouping

import React, { useEffect, useState } from "react"; // importing the useState and useEffect hooks from react

// importing the components
import Card from "../Components/Card";
import Navbar from "../Components/navbar";
import CustomSpinner from "../Components/CustomSpinner";

// Import Icons
import ToDoIcon from "../assets/Untitled/icons_FEtask/To-do.svg";
import InProgress from "../assets/Untitled/icons_FEtask/in-progress.svg";
import DoneIcon from "../assets/Untitled/icons_FEtask/Done.svg";
import BacklogIcon from "../assets/Untitled/icons_FEtask/Backlog.svg";
import CancelledIcon from "../assets/Untitled/icons_FEtask/Cancelled.svg";
import dotsIcon from "../assets/Untitled/icons_FEtask/3 dot menu.svg";
import PlusIcon from "../assets/Untitled/icons_FEtask/add.svg";
import NoPriorityIcon from "../assets/Untitled/icons_FEtask/No-priority.svg";
import LowPriorityIcon from "../assets/Untitled/icons_FEtask/Img - Low Priority.svg";
import MedPriorityIcon from "../assets/Untitled/icons_FEtask/Img - Medium Priority.svg";
import HighPriorityIcon from "../assets/Untitled/icons_FEtask/Img - High Priority.svg";

// Import Images
import profile from "../assets/profile.png";
import profile1 from "../assets/profile1.png";
import profile4 from "../assets/profile4.jpeg";
import profile5 from "../assets/profile5.jpeg";
import profile6 from "../assets/profile6.png";
import profile7 from "../assets/profile7.png";

// API which is used to fetch the data from the server 
const FETCH_URL = "https://api.quicksell.co/v1/internal/frontend-assignment";

// ================== Dashboard Component ==================

const Dashboard = () => {
  // state variables for the component 
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState({});
  const [user, setUser] = useState({});
  const [priority, setPriority] = useState({});
  const [grouping, setGrouping] = useState('status');
  const [ordering, setOrdering] = useState('priority');
  const [availableUser, setAvailableUser] = useState({});
  const [statusMapping, setStatusMapping] = useState({});
  const statusKeys = ["Backlog", "Todo", "In progress", "Done", "Canceled"];

  // use effect to fetch the data from the server
  useEffect(() => {
    getData();
  }, [grouping, ordering]);

  const sortByTitle = (tickets) => {
    return tickets.sort((a, b) => a.title.localeCompare(b.title));
  };

  // Here we are grouping the data based on the status of the task
  const groupByStatus = (tickets) => {
    let sortedTickets = tickets;

    // Sorting the tickets based on the title
    if (ordering === "title") {
      sortedTickets = sortByTitle(tickets);
    }

    // Grouping the data based on the status of the task 
    const grouped = sortedTickets.reduce((acc, ticket) => {
      if (!acc[ticket.status]) {
        acc[ticket.status] = [];
      }
      acc[ticket.status].push(ticket);
      return acc;
    }, {});

    // Adding the missing status keys
    statusKeys.forEach((key) => {
      if (!grouped[key]) {
        grouped[key] = [];
      }
    });

    if (ordering === "priority") {
      for (let key in grouped) {
        grouped[key].sort((a, b) => b.priority - a.priority);
      }
    }

    return {
      Keys: statusKeys,
      ...grouped,
    };
  };

  // GROUP BY PRIORITY FUNCTION 
  const groupByPriority = (tickets) => {
    let sortedTickets = tickets;

    if (ordering === "title") {
      sortedTickets = sortByTitle(tickets);
    }

    const priorityObject = sortedTickets.reduce((acc, ticket) => {
      if (!acc[ticket.priority]) {
        acc[ticket.priority] = [];
      }
      acc[ticket.priority].push(ticket);
      return acc;
    }, {});

    return {
      Keys: Object.keys(priorityObject),
      ...priorityObject,
    };
  };

 // GROUP BY USER FUNCTION
  const groupByUser = (tickets) => {
    let sortedTickets = tickets;

    if (ordering === "title") {
      sortedTickets = sortByTitle(tickets);
    }

    const grouped = sortedTickets.reduce((acc, ticket) => {
      if (!acc[ticket.userId]) {
        acc[ticket.userId] = [];
      }
      acc[ticket.userId].push(ticket);
      return acc;
    }, {});

    if (ordering === "priority") {
      for (let key in grouped) {
        grouped[key].sort((a, b) => b.priority - a.priority);
      }
    }

    return {
      Keys: userData.map((user) => user.id.toString()),
      ...grouped,
    };
  };

  // User Availability
  const availabilityMap = (users) => {
    return users.reduce((acc, user) => {
      acc[user.id] = user.available;
      return acc;
    }, {});
  };

  // Extract status mapping from the data 
  const extractStatusMapping = (data) => {
    const statusMapping = {};

    data.tickets.forEach((ticket) => {
      statusMapping[ticket.id] = ticket.status;
    });

    return statusMapping;
  };

//  ================== FETCH DATA FUNCTION ==================

  const getData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(FETCH_URL);
      const data = await response.json();
      setIsLoading(false);
      setUserData(data.users);
      setUser(groupByUser(data.tickets));
      setStatus(groupByStatus(data.tickets));
      setPriority(groupByPriority(data.tickets));
      setAvailableUser(availabilityMap(data.users));
      setStatusMapping(extractStatusMapping(data));
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };


// ================== DASHBOARD COMPONENT JSX ==================

  return (
    <>
      <Navbar
      // passing the props to the Navbar component
        grouping={grouping} 
        setGrouping={setGrouping}
        ordering={ordering}
        setOrdering={setOrdering}
        call={getData}
      />
      {/* Here we are checking if the data is loading or not */}
      <div className="Dashboard-Container">
        {isLoading ? (
          <CustomSpinner />
        ) : (
          <>

            {/* ================== STATUS GROUPING ================== */}
            {grouping === "status" && status.Keys.map((item, index) => (
              <div className="column" key={index}>
                <div className="Header">
                  <div className="icon-text">
                    {item === "Todo" ? (
                      <img src={ToDoIcon} alt="To-do icon" id="todo" />
                    ) : item === "In progress" ? (
                      <img src={InProgress} alt="in-progress icon" id="inprogress" />
                    ) : item === "Backlog" ? (
                      <img src={BacklogIcon} alt="Backlog icon" id="backlog" />
                    ) : item === "Done" ? (
                      <img src={DoneIcon} alt="Done icon" id="done" />
                    ) : (
                      <img src={CancelledIcon} alt="Cancelled icon" id="cancelled" />
                    )}
                    <span className="text">
                      {item === "In progress" ? "In Progress" : item}
                    </span>
                    <span>{status[item]?.length}</span>
                  </div>
                  <div className="actions">
                    <img src={PlusIcon} alt="Plus icon" id="plus" />
                    <img src={dotsIcon} alt="3 dots icon" id="dots" />
                  </div>
                </div>
                
                {/* Here we are displaying the tasks based on the status of the task */}
                {status[item] &&
                  status[item].map((value) => (
                    // Here we are passing the props to the Card component
                    <Card
                      id={value.id}
                      title={value.title}
                      tag={value.tag}
                      userId={value.userId}
                      status={status}
                      userData={userData}
                      priority={value.priority}
                      key={value.id}
                      grouping={grouping}
                      ordering={ordering}
                      statusMapping={statusMapping}
                    />
                  ))}
              </div>
            ))}

           {/* ================== USER GROUPING ================== */}
            {grouping === "users" && user.Keys.map((userId, index) => {
              const currentUserName =
                userData.find((u) => u.id.toString() === userId)?.name ||
                "Unknown";
              return (
                <div className="column" key={index}>
                  <div className="Header">
                    <div className="icon-text">
                      <div
                        className={String(availableUser[userId]) === "false"
                          ? "user-avatar-unavailable"
                          : "user-avatar"}
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
                          className={
                            String(availableUser[userId]) === "false"
                              ? "user-avatar-unavailable"
                              : "user-avatar"}
                          alt="user"
                        />
                      </div>
                      <span className="text">{currentUserName}</span>
                      <span>{user[userId]?.length}</span>
                    </div>
                    <div className="actions">
                      <img src={PlusIcon} alt="Plus icon" id="plus" />
                      <img src={dotsIcon} alt="3 dots icon" id="dots" />
                    </div>
                  </div>
                  {user[userId] &&
                    user[userId].map((ticket) => (
                      <Card
                        id={ticket.id}
                        title={ticket.title}
                        tag={ticket.tag}
                        userId={ticket.userId}
                        userData={userData}
                        priority={ticket.priority}
                        key={ticket.id}
                        grouping={grouping}
                        ordering={ordering}
                        status={status}
                        statusMapping={statusMapping}
                      />
                    ))}
                </div>
              );
            })}

            {/* ================== PRIORITY GROUPING ================== */}
            {grouping !== "status" && grouping !== "users" && priority.Keys.sort((a, b) => a - b).map((item, index) => (
              <div className="column" key={index}>
                <div className="Header">
                  <div className="icon-text-priority">
                    {item === "0" ? (
                      <img src={NoPriorityIcon} alt="No priority icon" id="nopriority" />
                    ) : item === "1" ? (
                      <img src={LowPriorityIcon} alt="Low priority icon" id="lowpriority" />
                    ) : item == "2" ? (
                      <img src={MedPriorityIcon} alt="Med priority icon" id="medpriority" />
                    ) : item == "3" ? (
                      <img src={HighPriorityIcon} alt="High priority icon" id="highpriority" />
                    ) : (
                      <i
                        className="bx bxs-message-square-error"
                        id="urgent"
                      ></i>
                    )}
                    <span className="text">
                      {`Priority ${item}` == "Priority 4"
                        ? "Urgent"
                        : `Priority ${item}` == "Priority 3"
                        ? "High"
                        : `Priority ${item}` == "Priority 2"
                        ? "Medium"
                        : `Priority ${item}` == "Priority 1"
                        ? "Low"
                        : "No Priority"}
                    </span>
                    <span className="count">{priority[item]?.length}</span>
                  </div>
                  <div className="actions">
                    <img src={PlusIcon} alt="Plus icon" id="plus" />
                    <img src={dotsIcon} alt="3 dots icon" id="dots" />
                  </div>
                </div>
                {priority[item] &&
                  priority[item].map((value) => (
                    <Card
                      id={value.id}
                      title={value.title}
                      tag={value.tag}
                      userId={value.userId}
                      status={status}
                      userData={userData}
                      priority={value.priority}
                      key={value.id}
                      grouping={grouping}
                      ordering={ordering}
                      statusMapping={statusMapping}
                    />
                  ))}
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default Dashboard;
