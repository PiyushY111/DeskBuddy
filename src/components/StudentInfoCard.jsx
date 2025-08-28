import React from "react";
import "../styles/StudentInfoCard.css";
import avatar from "../assets/avitar.webp"; // fallback to .svg if .png not found

const stageLabels = {
  arrival: {
    label: "Arrival",
    statusKey: "arrival",
    verifiedByKey: "arrivalVerifiedBy",
    icon: "🏠",
  },
  hostel: {
    label: "Hostel",
    statusKey: "hostelVerified",
    verifiedByKey: "hostelVerifiedBy",
    icon: "🏢",
  },
  documents: {
    label: "Documents",
    statusKey: "documentsVerified",
    verifiedByKey: "documentsVerifiedBy",
    icon: "📄",
  },
  kit: {
    label: "Kit",
    statusKey: "kitReceived",
    verifiedByKey: "kitReceivedBy",
    icon: "📦",
  },
};

const StudentInfoCard = ({ student, currentStage }) => {
  const stage = stageLabels[currentStage];
  let status = null;
  let completionPercentage = 0;
  let completedStages = 0;
  let totalStages = 4;

  if (student) {
    // Calculate completion percentage
    const stages = Object.values(stageLabels);
    completedStages = stages.filter((s) => student[s.statusKey]).length;
    completionPercentage = (completedStages / totalStages) * 100;
  }

  if (stage && student) {
    const completed = !!student[stage.statusKey];
    const verifiedBy = student[stage.verifiedByKey];
    status = {
      label: stage.label,
      completed,
      verifiedBy,
      icon: stage.icon,
    };
  }

  // Determine card color based on group
  const getCardColorClass = () => {
    if (!student) return "neutral";
    
    // Get the group from student data
    const group = student.group;
    if (!group) return "neutral";
    
    // Convert group to lowercase for case-insensitive comparison
    const groupLower = group.toLowerCase();
    
    // Check if group contains "red" or "blue" keywords
    if (groupLower.includes("red")) {
      return "group-red";
    } else if (groupLower.includes("blue")) {
      return "group-blue";
    }
    
    // Default fallback based on completion if group doesn't match
    if (completionPercentage === 100) return "completed";
    if (completionPercentage >= 50) return "in-progress";
    return "pending";
  };

  if (!student) {
    return (
      <div
        className={`student-card professional-card fade-in wide big ${getCardColorClass()}`}
      >
        <div className="student-card-header big">
          <div className="avatar-container">
            <img
              src={avatar}
              alt="Student Avatar"
              className="student-avatar big"
            />
            <div className="avatar-status neutral">⏳</div>
          </div>
          <div className="student-header-info">
            <span className="student-name big">No Student Data</span>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: "0%" }}></div>
            </div>
          </div>
        </div>
        <div className="student-fields empty">
          <div className="student-row">
            <span className="student-label">Status:</span>
            <span className="student-value">Please scan a QR code</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`student-card professional-card fade-in wide big ${getCardColorClass()}`}
    >
      <div className="student-card-header big">
        <div className="avatar-container">
          <img
            src={avatar}
            alt="Student Avatar"
            className="student-avatar big"
          />
          <div
            className={`avatar-status ${
              completionPercentage === 100
                ? "completed"
                : completionPercentage >= 50
                ? "in-progress"
                : "pending"
            }`}
          >
            {completionPercentage === 100
              ? "✅"
              : completionPercentage >= 50
              ? "🔄"
              : "⏳"}
          </div>
        </div>
        <div className="student-header-info">
          <span className="student-name big">{student.name}</span>
          <div className="progress-section">
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
            <div className="progress-text">
              {completedStages}/{totalStages} stages completed
            </div>
          </div>
        </div>
      </div>

      <div className="quick-stats">
        <div className="stat-item">
          <span className="stat-label">Student ID:</span>
          <span className="stat-value">{student.studentId}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Group:</span>
          <span className="stat-value">{student.group || "Not assigned"}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Room:</span>
          <span className="stat-value">
            {student.roomNumber || "Not assigned"}
          </span>
        </div>
      </div>

      <div className="student-main-fields">
        <div className="student-row">
          <span className="student-label">Due Amount:</span>
          <span className="student-value">
            {typeof student.dueAmount === "number"
              ? `₹${student.dueAmount.toLocaleString()}`
              : "Not available"}
          </span>
        </div>
        <div className="student-row">
          <span className="student-label">Email:</span>
          <span className="student-value">
            {student.email || "Not available"}
          </span>
        </div>
        <div className="student-row">
          <span className="student-label">Program:</span>
          <span className="student-value">
            {student.program || "Not available"}
          </span>
        </div>
      </div>

      {status && (
        <div className="scan-status-section single">
          <div className="scan-status-title">
            {status.icon} {status.label} Status
          </div>
          <div className="scan-status-row single">
            <span className="scan-status-label">{status.label}:</span>
            <span
              className={`scan-status-chip animated-chip ${
                status.completed ? "yes" : "no"
              }`}
            >
              {status.completed ? "✅ Completed" : "⏳ Pending"}
            </span>
            <span className="scan-status-by">
              {status.completed
                ? `by ${status.verifiedBy || "Unknown"}`
                : "Not assigned"}
            </span>
          </div>
        </div>
      )}

      <div className="all-stages-overview">
        <div className="stages-title">All Stages Overview</div>
        <div className="stages-grid">
          {Object.entries(stageLabels).map(([key, stageInfo]) => {
            const isCompleted = student[stageInfo.statusKey];
            const isCurrent = key === currentStage;
            return (
              <div
                key={key}
                className={`stage-item ${
                  isCompleted ? "completed" : isCurrent ? "current" : "pending"
                }`}
              >
                <span className="stage-icon">{stageInfo.icon}</span>
                <span className="stage-name">{stageInfo.label}</span>
                <span className="stage-status">
                  {isCompleted ? "✅" : isCurrent ? "🔄" : "⏳"}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StudentInfoCard;
