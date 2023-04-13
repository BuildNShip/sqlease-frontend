import { useState } from "react";
import { FaInstagram, FaTwitter, FaGithub, FaTelegram } from "react-icons/fa";
import LoadingIcons from "react-loading-icons";
import { OutputBox } from "@app/components/Output";
import "./App.scss";
import { toast } from "sonner";

function App() {
  const [isLoading, setLoading] = useState(false);
  const [outputStatus, setOutputStatus] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState("");

  const handlePrompt = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
  };

  const getOutput = (): void => {
    const requestBody = {
      prompt: prompt,
    };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    };
    const fetchOutput = async (): Promise<void> => {
      try {
        const response = await fetch(
          "https://api.buildnship.in/sqlease/v1/generate/",
          requestOptions
        );
        const data = await response.json();
        setOutput(data.response.answer);
        setOutputStatus(true);
        setLoading(false);
      } catch {
        toast.error("Error Generating Output");
        setLoading(false);
      }
    };
    fetchOutput();
  };
  return (
    <>
      <div className="App">
        <img id="logo" src="sql-ease.png" alt="logo" />
        <h1>Generate SQL Queries from Natural Language</h1>
        <h2>
          Write a quick sentence about what you want the query to be about (ex.
          Find name of all students in the table, Fetch current date-time from
          the system, create a table called heroes).
        </h2>
        <div className="prompt-container">
          <textarea
            placeholder="start typing here"
            className="prompt-box"
            value={prompt}
            onChange={handlePrompt}
          />
        </div>
        <button
          className="rounded-btn violet-btn"
          onClick={() => {
            setLoading(true);
            getOutput();
          }}
        >
          {isLoading ? (
            <LoadingIcons.ThreeDots className="loader" />
          ) : (
            "Generate"
          )}
        </button>
      </div>
      {outputStatus ? <OutputBox data={output} /> : null}
      <a
        href="https://www.buymeacoffee.com/arjunms"
        className="buy-me-a-coffee"
      >
        <img src="./coffee-icon.png" alt="buy-me-a-coffee" />
      </a>
      <div className="footer">
        <a href="https://buildnship.in/">
          <img src="Purple_B_Logo.png" alt="logo" />
        </a>
        <div className="social-container">
          <a href="https://twitter.com/buildnship/">
            <FaTwitter size={25} />
          </a>
          <a href="https://instagram.com/buildnship?igshid=YmMyMTA2M2Y=">
            <FaInstagram size={25} />
          </a>
          <a href="https://github.com/BuildNShip">
            <FaGithub size={25} />
          </a>
          <a href="https://t.me/buildnship">
            <FaTelegram size={25} />
          </a>
        </div>
      </div>
    </>
  );
}

export default App;
