import "./Lawyers.css";

export default function LawyerCard({ lawyer }) {
  return (
    <div className="lawyer-card">
      <div className="lawyer-header">
        <div className="avatar">{lawyer.name.charAt(4)}</div>
        <div>
          <h3>{lawyer.name}</h3>
          <p className="spec">{lawyer.specialization}</p>
          <p className="location">📍 {lawyer.location}</p>
        </div>
      </div>

      <div className="lawyer-stats">
        <div>
          <span>{lawyer.experience} yrs</span>
          <small>Experience</small>
        </div>
        <div>
          <span>{lawyer.casesWon}</span>
          <small>Cases Won</small>
        </div>
        <div>
          <span>{lawyer.successRate}%</span>
          <small>Success</small>
        </div>
      </div>

      <div className="lawyer-footer">
        <div className="fee">₹ {lawyer.fee} / hearing</div>
        <button className="hire-btn">Hire Advocate</button>
      </div>
    </div>
  );
}
