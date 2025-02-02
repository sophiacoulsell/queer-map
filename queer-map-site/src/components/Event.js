import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import '../styles/Event.css';
import AddressAutocomplete from './AddressAutocomplete'; // Import the AddressAutocomplete component

function Event() {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState("");
  const [loc, setLoc] = useState("");
  const [tags, setTags] = useState([]);
  const [otherTag, setOtherTag] = useState("");
  const [org, setOrg] = useState("Unknown");

  const handleTagChange = (e) => {
    const { value, checked } = e.target;
    setTags((prevTags) =>
      checked ? [...prevTags, value] : prevTags.filter((tag) => tag !== value)
    );
  };

  const handleOtherTagChange = (e) => {
    setOtherTag(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otherTag) {
      setTags((prevTags) => [...prevTags, otherTag]);
    }
  };

  return (
    <>
      <div className="event-header">
        <h1>Event Page</h1>
      </div>

      <form className="event-form" onSubmit={handleSubmit}>
        <label className="form-label">
          Event Name:
          <input
            type="text"
            className="form-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label className="form-label">
          Description:
          <textarea
            className="form-input"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </label>

        <label className="form-label">
          Date:
          <input
            type="date"
            className="form-input"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>

        {/* Address Section with Autocomplete */}
        <label className="form-label">
          Location:
          <AddressAutocomplete /> {/* Insert the AddressAutocomplete component here */}
        </label>

        <label className="form-label">
          Tags (Select all that apply):
          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                value="Pride"
                onChange={handleTagChange}
                checked={tags.includes("Pride")}
              />
              Pride
            </label>
            <label>
              <input
                type="checkbox"
                value="Music"
                onChange={handleTagChange}
                checked={tags.includes("Music")}
              />
              Music
            </label>
            <label>
              <input
                type="checkbox"
                value="Diversity"
                onChange={handleTagChange}
                checked={tags.includes("Diversity")}
              />
              Diversity
            </label>
            <label>
              <input
                type="checkbox"
                value="Sustainability"
                onChange={handleTagChange}
                checked={tags.includes("Sustainability")}
              />
              Sustainability
            </label>
            <label>
              <input
                type="checkbox"
                value="LGBTQ+ Networking"
                onChange={handleTagChange}
                checked={tags.includes("LGBTQ+ Networking")}
              />
              LGBTQ+ Networking
            </label>
            <label>
              <input
                type="checkbox"
                value="Eco-Conscious"
                onChange={handleTagChange}
                checked={tags.includes("Eco-Conscious")}
              />
              Eco-Conscious
            </label>
            <label>
              <input
                type="checkbox"
                value="Free"
                onChange={handleTagChange}
                checked={tags.includes("Free")}
              />
              Free
            </label>
            <label>
              <input
                type="checkbox"
                value="Other"
                onChange={handleTagChange}
              />
              Other
            </label>
            {tags.includes("Other") && (
              <input
                type="text"
                className="form-input"
                value={otherTag}
                onChange={handleOtherTagChange}
                placeholder="Specify other tag"
              />
            )}
          </div>
        </label>

        <label className="form-label">
          Organizer:
          <input
            type="text"
            className="form-input"
            value={org}
            onChange={(e) => setOrg(e.target.value)}
          />
        </label>

        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Event />);

export default Event;
