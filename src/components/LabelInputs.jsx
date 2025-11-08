import { useState } from "react";

export default function LabelInput({ label, type = "text", value, onChange, error }) {
  const [focused, setFocused] = useState(false);

  return (
    <div className={`input-group ${focused || value ? "active" : ""}`}>
      <label>{label}</label>
      <input
        type={type}
        className="input"
        value={value}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={(e) => onChange(e.target.value)}
      />
      {error && <div className="error">{error}</div>}
    </div>
  );
}
