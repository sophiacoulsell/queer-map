import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import '../styles/Event.css';
import AddressAutocomplete from './AddressAutocomplete';

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (otherTag) {
      setTags((prevTags) => [...prevTags, otherTag]);
    }

    const eventData = {
      name,
      description: desc,
      date,
      location: loc, // Send location data (could be a string or object from AddressAutocomplete)
      tags,
      organizer: org
    };

    try {
      console.log('Submitting event:', eventData);
      const response = await fetch('http://127.0.0.1:5000/create_event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventData)
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error submitting event:', error);
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
            <AddressAutocomplete setLoc={setLoc} />
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
