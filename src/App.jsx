import { useEffect, useState } from "react";
import CardViewer from "./components/CardViewer";
import Controls from "./components/Controls";
import Toast from "./components/Toast";
import "./index.css";
import Questions from "./components/Questions";
import { vigenereDecrypt } from "./utils/vigenere";

export default function App() {

  const [unlocked, setUnlocked] = useState(false);
  const [toast, setToast] = useState("");
  const [cards, setCards] = useState([]);
  const [index, setIndex] = useState(0);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  function getGreetingCard() {

    const now = new Date();
    const hours = now.getHours();

    if (hours >= 6 && hours < 12) {
      return { text: "☀️ Good morning, my tiny queen 💖" };
    } else if (hours >= 12 && hours < 17) {
      return { text: "🌤️ Good afternoon, Sivheyyyyyyyy ☀️" };
    } else if (hours >= 17 && hours < 22) {
      return { text: "🌙 Good evening, GC 💫" };
    } else if (hours >= 22 && hours < 24) {
      return { text: "😴 Good night, wifeyyyyyy 🌌" };
    } else {
      return { text: "🌚 You should be sleeping baby cakes 😴" };
    }
  }

  async function loadCards () {
    await fetch("/cipher.txt")
    .then((r) => r.text())
    .then((text) => {
      let plain = vigenereDecrypt(text.trim(), "ROCKETMAN");
      const lines = plain.split(/\r?\n/).filter(Boolean);

      const greetingCard = getGreetingCard().text;
      const updatedLines = [greetingCard, ...lines];

      setCards(updatedLines);
    })
    .catch((err) => {
      console.error("Failed to load cipher:", err);
      setToast("⚠️ Contact your mans, he broke something!!!!");
    });
  }

  async function handleSuccess(){
    await loadCards(); 
    setUnlocked(true);
  }

  useEffect(() => {
    if (index === cards.length - 1 && cards.length > 0) {
      showToast("🎂 Happy Birthday My Tiny Queen! 🥂💖");
    }
  }, [index, cards.length]);

  const next = () => {
    if (index < cards.length - 1) {
      setIndex(index + 1);
    } 
  };

  const prev = () => setIndex((i) => Math.max(0, i - 1));

  const jumpTo = (i) => setIndex(i);

  const renderBirthdayMessage = () => {
      return  (<>
        <CardViewer text={cards[index]} />
        <Controls
          index={index}
          total={cards.length}
          onNext={next}
          onPrev={prev}
          onJump={jumpTo}
        />
      </>  );
  };

  return (
    <div className="mainapp">
      
    {!unlocked ? (
      <Questions onSuccess={handleSuccess} showToast={showToast} />
    ) : (
      renderBirthdayMessage()
    )}

      {toast && <Toast message={toast} />}
    </div>
  );



}
