// Desc: Navbar component for the application
import React, { useState, useRef, useEffect } from "react";

// Navbar component is used to display the navbar in the dashboard for grouping and ordering tasks based on the user's choice 
const Navbar = ({ grouping: propGrouping, setGrouping, ordering: propOrdering, setOrdering, call }) => {
  // State variables for dropdown 
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  // State variables for grouping and ordering tasks 
  const initialGrouping = localStorage.getItem("grouping") || propGrouping;
  const initialOrdering = localStorage.getItem("ordering") || propOrdering;

  const [grouping, setLocalGrouping] = useState(initialGrouping);
  const [ordering, setLocalOrdering] = useState(initialOrdering);
/*
    useEffect to set the grouping and ordering tasks in the local storage
    This is used to persist the grouping and ordering tasks even after the page reload
    This is done to maintain the state of the grouping and ordering tasks
*/
  useEffect(() => {
    localStorage.setItem("grouping", grouping);
    setGrouping(grouping);
  }, [grouping]);

  useEffect(() => {
    localStorage.setItem("ordering", ordering);
    setOrdering(ordering);
  }, [ordering]);

  // Function to handle the grouping of tasks
  const handleGrouping = (event) => {
    const newValue = event.target.value;
    localStorage.setItem("grouping", newValue);
    setGrouping(newValue);
    if (newValue === "users") {
      call();
    }
  };

  // Function to handle the ordering of tasks
  const handleOrdering = (event) => {
    const newValue = event.target.value;
    localStorage.setItem("ordering", newValue);
    setOrdering(newValue);
  };

  // useEffect to handle the click outside the dropdown
  // Basically This is used to close the dropdown when the user clicks outside the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    // Event listener to handle the click outside the dropdown
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup function to remove the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Navbar component JSX
  return (
    <div className="Navbar">
      <div className="dropdown-container" ref={dropdownRef}>
        <button onClick={() => setIsOpen(!isOpen)} className="dropdown-btn">
          <i className="bx bx-slider"></i>
          <div className="btn-txt">Display</div>
          <i className="bx bx-chevron-down"></i>
        </button>
        {isOpen && (
          <div className="dropdown-content">
            <div className="Grouping">
              <label>Grouping</label>
              <select value={propGrouping} onChange={handleGrouping}>
                <option value="status">Status</option>
                <option value="users">User</option>
                <option value="priority">Priority</option>
              </select>
            </div>
            <div className="Ordering">
              <label>Ordering</label>
              <select value={propOrdering} onChange={handleOrdering}>
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
