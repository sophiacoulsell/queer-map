import React from "react";
import "../styles/HomePage.css";

function FilterTags({ filterList, selectedTags, onTagSelect }) {
  if (!Array.isArray(filterList)) {
    filterList = [filterList];
  }

  const rainbowColors = [
    "#ffadad", // Red
    "#ffd6a5", // Orange
    "#fdffb6", // Yellow
    "#caffbf", // Green
    "#ADF8FF", // Blue
    "#a0c4ff", // Indigo
    "#bdb2ff", // Violet
    "#ffc6ff", // Pink
  ];

  return (
    <div className="tag-container">
      {filterList.map((str, index) => (
        <div
          className="tag-item"
          key={index}
          onClick={() => onTagSelect(str)} // Trigger the parent function
          style={{
            border: selectedTags && selectedTags.includes(str) ? '2px solid black' : 'none', // Ensure selectedTags is defined before calling includes
            backgroundColor: rainbowColors[index % rainbowColors.length],
            color: "black",
            cursor: "pointer",
            padding: "5px",
            margin: "5px",
            borderRadius: "5px",
            boxSizing: "border-box",
          }}
        >
          <span>{str}</span>
        </div>
      ))}
    </div>
  );
}

export default FilterTags;
