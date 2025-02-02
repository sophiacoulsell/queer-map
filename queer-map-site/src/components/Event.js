import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';

function Event(){
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [date, setDate] = useState("");
    const [loc, setLoc] = useState("");
    const [tags, setTags] = useState("");
    const [org, setOrg] = useState("Unknown");

    return(
        <>
        <div>
            <p>
                Event page
            </p>
        </div>
        <form>
            <label>Event Name: <br></br>
                <input
                    type ="text"
                    value = {name}
                    onChange={(e) => setName(e.target.value)}
                />
            </label><br></br>
            <label>Description:<br></br>
            <input
                    type ="text"
                    value = {desc}
                    onChange={(e) => setDesc(e.target.value)}
                />
            </label><br></br>
            <label>Date:<br></br>
            <input
                    type ="date"
                    value = {date}
                    onChange={(e) => setDate(e.target.value)}
                />
            </label><br></br>
            <label>Location:<br></br>
            <input
                    type ="search"
                    value = {loc}
                    onChange={(e) => setLoc(e.target.value)}
                />
            </label><br></br>
            <label>Tags: <br></br>
            <input
                    type ="text"
                    value = {tags}
                    onChange={(e) => setTags(e.target.value)}
                />
            </label><br></br>
            <label>Organizer:<br></br>
            <input
                    type ="text"
                    value = {org}
                    onChange={(e) => setOrg(e.target.value)}
                />
            </label><br></br>
            <input type="submit" value="Submit"></input>
        </form>
        <div>
            {name} - {desc}
        </div>
        </>

    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Event />);

export default Event