import { toast } from "sonner";
import "@app/App.scss";

interface outputProps {
  data: string;
}

export const OutputBox = (props: outputProps) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(props.data);
      toast.success("Text Was Copied");
    } catch {
      toast.error("Error Copying Text");
    }
  };

  return (
    <div className="output-container">
      <h2>Output</h2>
      <div className="output-box">
        <div className="copycode-container" onClick={handleCopy}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M5 22q-.825 0-1.413-.588T3 20V6h2v14h11v2H5Zm4-4q-.825 0-1.413-.588T7 16V4q0-.825.588-1.413T9 2h9q.825 0 1.413.588T20 4v12q0 .825-.588 1.413T18 18H9Zm0-2h9V4H9v12Zm0 0V4v12Z"
            />
          </svg>
        </div>
        <div className="output-text-container">
          <p id="output-text">{props.data}</p>
        </div>
      </div>
    </div>
  );
};
