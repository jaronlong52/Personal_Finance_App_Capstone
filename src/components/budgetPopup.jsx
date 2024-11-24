import React, { useContext, useState } from "react";
import './budgetPopup.css'
import { UsernameContext } from "../contexts/UsernameContext";
import axios from "axios";

const ValueChangerPopup = ({ currentValue, onValueChange }) => {
  const [showPopup, setShowPopup] = useState(false); // State for popup visibility
  const [value, setValue] = useState(currentValue);            // State for storing the value in the input field
  const { variable } = useContext(UsernameContext);

  // Toggles the popup visibility
  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  // Handles the change in the input field value
  const handleInputChange = (event) => {
    setValue(event.target.value);
  };

  // Handles the value change and then hides the popup
  const handleSave = () => {
    onValueChange(value);
    axios.post('http://localhost:8081/budgetPopup/update', {username: variable, value: value})
    .then(res => {
      console.log(res);
    });
    setValue('');
    setShowPopup(false);               // Close the popup after saving
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div>
      <button className="budgetPopup-update-button" onClick={togglePopup}>
        Update Monthly Income
      </button>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <button className="close-btn" onClick={closePopup}>X</button>
            <h2>Update Monthly Income</h2>
            <div className="budgetPopup-input-content">
                <input
                  type="text"
                  value={value}
                  onChange={handleInputChange}
                  placeholder="$"
                />
                <button className="budgetPopup-save-button" onClick={handleSave}>Update</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ValueChangerPopup;
