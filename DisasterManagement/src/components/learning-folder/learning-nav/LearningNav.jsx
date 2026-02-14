import React, { useState, useEffect } from "react";
import modules from "./data";
import "./LearningNav.css";
import play from '../../../assets/play.svg'

function LearningNav() {
  const [activeCategory, setActiveCategory] = useState("All Topics");
  const [isMobile, setIsMobile] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Legal categories instead of generic learning
  const categories = [
    { name: "All Topics" },
    ...Array.from(
      new Map(
        modules.map((m) => [m.category, { name: m.category, icon: m.icon }])
      ).values()
    ),
  ];

  const filtered =
    activeCategory === "All Topics"
      ? modules
      : modules.filter((m) => m.category === activeCategory);

  // Responsive
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handleCategorySelect = (categoryName) => {
    setActiveCategory(categoryName);
    setDropdownOpen(false);
  };

  const activeCategoryObj = categories.find(cat => cat.name === activeCategory);

  return (
    <div className="dashboard">

      {/* HEADER 
      <div className="learning-header">
        <h1>Know Your Rights</h1>
        <p>Learn Indian Constitution, Fundamental Rights & Legal Awareness</p>
      </div>
*/}
      {/* Navigation */}
      <nav className="nav">
        {isMobile ? (
          <div className="mobile-filter-dropdown">
            <button 
              className="dropdown-toggle"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <span className="icon">{activeCategoryObj?.icon}</span>
              <span>{activeCategory}</span>
              <small>
                {filtered.length} topics
              </small>
              <span className={`dropdown-arrow ${dropdownOpen ? 'open' : ''}`}>▼</span>
            </button>
            
            {dropdownOpen && (
              <div className="dropdown-menu">
                {categories.map((cat) => (
                  <div
                    key={cat.name}
                    className={`dropdown-item ${activeCategory === cat.name ? "active" : ""}`}
                    onClick={() => handleCategorySelect(cat.name)}
                  >
                    <span className="icon">{cat.icon}</span>
                    <span>{cat.name}</span>
                    <small>
                      {cat.name === "All Topics"
                        ? modules.length
                        : modules.filter((m) => m.category === cat.name).length}
                    </small>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <ul>
            {categories.map((cat) => (
              <li
                key={cat.name}
                className={activeCategory === cat.name ? "active" : ""}
                onClick={() => handleCategorySelect(cat.name)}
              >
                <span className="icon">{cat.icon}</span>
                <span>{cat.name}</span>
                <small>
                  {cat.name === "All Topics"
                    ? modules.length
                    : modules.filter((m) => m.category === cat.name).length}
                </small>
              </li>
            ))}
          </ul>
        )}
      </nav>

      {/* Cards */}
      <div className="cards-learn">
        {filtered.map((m) => (
          <div className="learning-card" key={m.id}>

            <div className="article-badge">
              {m.article && <span>Article {m.article}</span>}
            </div>

            <h3>{m.title}</h3>
            <p>{m.description}</p>

            <small>You understand: {m.progress}%</small>

            <div className="progress">
              <div
                className="progress-bar"
                style={{ width: `${m.progress}%` }}
              ></div>
            </div>

            <div className="meta">
              <span>⏱ {m.duration}</span>
              <span>📘 {m.lessons} Concepts</span>
              <span>👥 {m.users} learners</span>
              <span>⭐ {m.rating}</span>
            </div>

            <span className={`level ${m.level.toLowerCase()}`}>
              {m.level === "Beginner" ? "Basic Right" :
               m.level === "Intermediate" ? "Important Law" :
               "Legal Knowledge"}
            </span>

            <div className="action">
              <img src={play} alt="" />
              <div className="action-para">Learn Your Right</div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default LearningNav;
