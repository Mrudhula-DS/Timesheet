import React from "react";

export default function ClientDashboard() {
  return (
    <div>
      <div className="welcome-text">✅ Client Dashboard</div>

      <div className="cards">
        <div className="card">
          <h3>Active Projects</h3>
          <p>12</p>
        </div>

        <div className="card">
          <h3>Assigned Managers</h3>
          <p>4</p>
        </div>

        <div className="card">
          <h3>Pending Reports</h3>
          <p>3</p>
        </div>
      </div>
    </div>
  );
}
