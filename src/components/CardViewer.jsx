export default function CardViewer({ text }) {
    const linkify = (t) =>
      t.replace(
        /(https?:\/\/[^\s]+)/g,
        '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>'
      );
  
    return (
      <div
        className="card"
        dangerouslySetInnerHTML={{ __html: linkify(text) }}
      />
    );
  }
  