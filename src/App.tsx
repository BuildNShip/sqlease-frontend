import { useState } from 'react'
import './App.scss'
import LoadingIcons from 'react-loading-icons'
import NavBar from './components/NavBar/NavBar'

function App() {
  const [isLoading, setLoading] = useState(false)
  const [output, setOutput]  = useState(false)
  return (
    <>
      {/* <NavBar /> */}
      <div className="App">
        <h1>Generate SQL Queries from Natural Language</h1>
        <h2>Write a quick sentence about what you want the query to be about (ex. Find name of all students in the table, Fetch current date-time from the system, create a table called heroes).</h2>
        <div className="prompt-container">
          <textarea
            placeholder="start typing here"
            className="prompt-box"
          />
        </div>
        <button
          className='rounded-btn violet-btn'
          onClick={() => {
            setLoading(true)
            setTimeout(() => {
              setOutput(true);
              setLoading(false);
            }, 1000);
          }}
        >{isLoading ?
          <LoadingIcons.ThreeDots className='loader' />
          : "Generate"}</button>
      </div>
      {output? <OutputBox/> : null}
      <a
        href='https://www.buymeacoffee.com/arjunms'
        className="buy-me-a-coffee">
        <img src="./public/coffee-icon.png" alt="buy-me-a-coffee" />
      </a>
    </>
  )
}



const OutputBox = ()=> {
  const [copyStatus,setCopyStatus] = useState("")
  const [outputText,setOutputTEXT] = useState("This is output")
  const handleClick = () => {
    setCopyStatus("Copied!!")
    setTimeout(()=>{
      setCopyStatus("")
    },2000)
    console.log(outputText);
  };
  return(
    <div className="output-container">
      <h2>Output</h2>
    <div className="output-box">
      <div 
        className="copycode-container"
        onClick={handleClick}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M5 22q-.825 0-1.413-.588T3 20V6h2v14h11v2H5Zm4-4q-.825 0-1.413-.588T7 16V4q0-.825.588-1.413T9 2h9q.825 0 1.413.588T20 4v12q0 .825-.588 1.413T18 18H9Zm0-2h9V4H9v12Zm0 0V4v12Z" /></svg>
        <p>{copyStatus}</p>
        </div>
      <p id="output-text" placeholder="start typing here">{outputText}</p>
    </div>
  </div>
  )
}

export default App
