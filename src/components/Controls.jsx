export default function Controls({ index, total, onNext, onPrev, onJump }) {
    return (
      <div className="controls">
        <button onClick={onPrev} disabled={index === 0}>
          ⬅️ Previous
        </button>
  
        <select
          value={index}
          onChange={(e) => onJump(Number(e.target.value))}
          className="jump-select"
        >
          {Array.from({ length: total }).map((_, i) => (
            <option key={i} value={i}>
              Card {i + 1}
            </option>
          ))}
        </select>
  
        <button onClick={onNext} disabled={index === total - 1}>
          Next ➡️
        </button>
      </div>
    );
  }
  