import lawyers from "./lawyersData";
import LawyerCard from "./LawyerCard";
import "./Lawyers.css";

export default function LawyersModal({ close }) {
  return (
    <div className="modal-overlay">
      <div className="modal-card large" onClick={(e)=>e.stopPropagation()}>

        <div className="modal-header">
          <h2>Connect With Advocates</h2>
          <button onClick={close}>✖</button>
        </div>

        <div className="lawyers-grid">
          {lawyers.map(lawyer => (
            <LawyerCard key={lawyer.id} lawyer={lawyer}/>
          ))}
        </div>

      </div>
    </div>
  );
}
