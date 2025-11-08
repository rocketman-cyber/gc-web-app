import { useState, useRef, useEffect } from "react";

export default function LabelSelect({ label, value, onChange,options = [], hintText }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleOptionClick = (option) => {
    onChange(option);
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="label-select" ref={dropdownRef}>
      <label className="label-text">{label}</label>

      <div
        className={`custom-select ${open ? "open" : ""}`}
        onClick={() => setOpen(!open)}
      >
        <span className={`selected ${!value ? "placeholder" : ""}`}>
          {value || hintText}
        </span>
        <span className="arrow">▾</span>
      </div>

      {open && (
        <ul className="dropdown">
          {options.map((opt) => (
            <li
              key={opt}
              className={`option ${opt === value ? "active" : ""}`}
              onClick={() => handleOptionClick(opt)}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}

    </div>
  );
}
