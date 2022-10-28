import { useState } from "react";

import "./App.css";
import axios from "axios";
import React from "react";

function App() {
    const [name, setName] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [spinnerClass, setSpinnerClass] = useState("");
    const prefixNames = ["Sexy", "Slutty", "Spicy", "Horny"];

    const gener8Name = async () => {
        setSpinnerClass("spin");
        setImageUrl("");
        const res = await axios.get("/outfit", {
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
        });
        setName(`${prefixNames[Math.floor(Math.random() * prefixNames.length)]} ${res.data.query.random[0].title}`);
    };

    React.useEffect(() => {
        axios
            .post("/image", `text=${name}`, {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "api-key": "quickstart-QUdJIGlzIGNvbWluZy4uLi4K",
                },
            })
            .then((results) => {
                setSpinnerClass("");
                setImageUrl(results.data.output_url);
            })
            .catch((error) => {
                const status = error.response.status;
                setImageUrl(`https://httpcats.com/${status}.jpg`);
            });
    }, [name]);

    return (
        <div className="App">
            <h1>{name && name}</h1>
            <img src={imageUrl && imageUrl} className={spinnerClass} />
            <br />
            <button onClick={gener8Name}>Generate</button>
        </div>
    );
}

export default App;
