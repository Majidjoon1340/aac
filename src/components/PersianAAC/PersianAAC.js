import React, { useState, useEffect, useRef } from 'react';
import './PersianAAC.css';

// AAC Categories & Data customized for Iranian Patients (ICU, Stroke, Aphasia, ALS)
const CATEGORIES = [
  {
    id: 'emergency',
    name: 'نیازهای فوری و ICU',
    icon: '🚨',
    color: '#d32f2f',
    bg: '#ffebee',
    items: [
      { text: 'آب می‌خواهم', icon: '💧', color: '#1976d2', urgent: true },
      { text: 'پرستار لطفاً', icon: '👩‍⚕️', color: '#d32f2f', urgent: true },
      { text: 'کمک کنید', icon: '🆘', color: '#d32f2f', urgent: true },
      { text: 'دستشویی دارم', icon: '🚽', color: '#f57c00', urgent: true },
      { text: 'تنگی نفس دارم', icon: '🫁', color: '#0288d1', urgent: true },
      { text: 'ساکشن کنید (خفگی)', icon: '🌬️', color: '#c2185b', urgent: true },
      { text: 'پهلو به پهلو کنید', icon: '🔄', color: '#7b1fa2' },
      { text: 'سردم است (پتو بدهید)', icon: '🥶', color: '#0288d1' },
      { text: 'گرمم است', icon: '🥵', color: '#e64a19' },
      { text: 'خارش دارم', icon: '🦟', color: '#fbc02d' },
      { text: 'درد شدید دارم', icon: '😫', color: '#d32f2f', urgent: true },
      { text: 'صبر کنید / دست نگه دارید', icon: '🛑', color: '#d32f2f' },
      { text: 'بله', icon: '✅', color: '#388e3c' },
      { text: 'خیر / نه', icon: '❌', color: '#d32f2f' }
    ]
  },
  {
    id: 'pain',
    name: 'ارزیابی درد و اندام‌ها',
    icon: '⚡',
    color: '#e64a19',
    bg: '#fbe9e7',
    items: [
      { text: 'بدون درد (۰)', icon: '😊', color: '#388e3c' },
      { text: 'درد کم (۲)', icon: '🙂', color: '#689f38' },
      { text: 'درد متوسط (۵)', icon: '😐', color: '#fbc02d' },
      { text: 'درد شدید (۸)', icon: '😣', color: '#f57c00' },
      {
        text: 'درد غیرقابل تحمل (۱۰)',
        icon: '😭',
        color: '#d32f2f',
        urgent: true
      },
      { text: 'دردم می‌سوزد', icon: '🔥', color: '#e64a19' },
      { text: 'دردم تیر می‌کشد', icon: '⚡', color: '#f57c00' },
      { text: 'فشار می‌آورد', icon: '🗜️', color: '#5d4037' },
      { text: 'نبض می‌زند و می‌کوبد', icon: '🔨', color: '#c2185b' },
      { text: 'بی‌حس و کرخت شده', icon: '❄️', color: '#0288d1' },
      { text: 'سرم درد می‌کند', icon: '🧠', color: '#7b1fa2' },
      { text: 'سینه‌ام و قلبم', icon: '🫀', color: '#d32f2f' },
      { text: 'شکمم درد می‌کند', icon: '🫃', color: '#f57c00' },
      { text: 'کمرم و پشتم', icon: '🦴', color: '#5d4037' },
      { text: 'دستم درد می‌کند', icon: '🦾', color: '#00796b' },
      { text: 'پایم درد می‌کند', icon: '🦵', color: '#00796b' },
      { text: 'گلو و دهانم', icon: '👄', color: '#c2185b' },
      { text: 'جای سرم و سوزن', icon: '💉', color: '#1976d2' }
    ]
  },
  {
    id: 'food',
    name: 'غذا و نوشیدنی ایرانی',
    icon: '🍲',
    color: '#f57c00',
    bg: '#fff3e0',
    items: [
      { text: 'چای کم‌رنگ می‌خواهم', icon: '🍵', color: '#795548' },
      { text: 'آب ولرم بدهید', icon: '💧', color: '#0288d1' },
      { text: 'سوپ داغ می‌خواهم', icon: '🍲', color: '#e64a19' },
      { text: 'شیر یا فرنی', icon: '🥛', color: '#0097a7' },
      { text: 'آبمیوه طبیعی', icon: '🍎', color: '#e91e63' },
      { text: 'کته و ماست', icon: '🍚', color: '#558b2f' },
      { text: 'نان و پنیر نرم', icon: '🍞', color: '#f57c00' },
      { text: 'گرسنه‌ام است', icon: '🍽️', color: '#e64a19' },
      { text: 'سیر شدم، ممنون', icon: '✋', color: '#388e3c' },
      { text: 'حالت تهوع دارم', icon: '🤢', color: '#689f38' },
      { text: 'بی‌اشتها هستم', icon: '🚫', color: '#757575' },
      { text: 'به من غذا بدهید', icon: '🥣', color: '#f57c00' },
      { text: 'خودم می‌توانم بخورم', icon: '🥄', color: '#1976d2' }
    ]
  },
  {
    id: 'comfort',
    name: 'راحتی، استراحت و بهداشت',
    icon: '🛏️',
    color: '#00796b',
    bg: '#e0f2f1',
    items: [
      { text: 'سر تخت را بلند کنید', icon: '🛌', color: '#00796b' },
      { text: 'تخت را صاف و خوابیده کنید', icon: '🛏️', color: '#00796b' },
      { text: 'بالشم را درست کنید', icon: '🪶', color: '#0097a7' },
      { text: 'چراغ را خاموش کنید', icon: '💡', color: '#455a64' },
      { text: 'چراغ را روشن کنید', icon: '🕯️', color: '#fbc02d' },
      { text: 'محیط شلوغ است (سکوت)', icon: '🔇', color: '#d32f2f' },
      { text: 'پنجره را باز کنید', icon: '🪟', color: '#0288d1' },
      { text: 'خوابم می‌آید / می‌خواهم بخوابم', icon: '😴', color: '#512da8' },
      { text: 'مسواک یا دهان‌شویه بزنید', icon: '🪥', color: '#00796b' },
      { text: 'لب‌هایم خشک شده (کرم بزنید)', icon: '🧴', color: '#c2185b' },
      { text: 'دستمال کاغذی می‌خواهم', icon: '🧻', color: '#78909c' },
      { text: 'عینکم را بدهید', icon: '👓', color: '#455a64' },
      { text: 'تلویزیون را روشن کنید', icon: '📺', color: '#303f9f' }
    ]
  },
  {
    id: 'emotions',
    name: 'احساسات و روحیه',
    icon: '💖',
    color: '#7b1fa2',
    bg: '#f3e5f5',
    items: [
      { text: 'حالم خوب است', icon: '🌸', color: '#388e3c' },
      { text: 'نگران و دلواپسم', icon: '😥', color: '#f57c00' },
      { text: 'ترسیده‌ام', icon: '😨', color: '#d32f2f' },
      { text: 'خیلی خسته‌ام', icon: '🥱', color: '#795548' },
      { text: 'کلافه شده‌ام', icon: '😤', color: '#c2185b' },
      { text: 'آرامش دارم', icon: '🌿', color: '#00796b' },
      { text: 'می‌خواهم دعا کنم (قرآن بخوانید)', icon: '🤲', color: '#388e3c' },
      { text: 'خیلی متشکرم', icon: '🙏', color: '#1976d2' },
      { text: 'پیشم بمانید، نروید', icon: '🫂', color: '#7b1fa2' },
      { text: 'می‌خواهم کمی تنها باشم', icon: '🚪', color: '#616161' },
      { text: 'می‌خواهم حرف بزنم', icon: '🗣️', color: '#0288d1' },
      { text: 'دوستت دارم', icon: '❤️', color: '#e91e63' }
    ]
  },
  {
    id: 'family',
    name: 'خانواده و همراهان',
    icon: '👨‍👩‍👧',
    color: '#1976d2',
    bg: '#e3f2fd',
    items: [
      { text: 'همسرم کجاست؟', icon: '👩', color: '#c2185b' },
      { text: 'بچه‌هایم بیایند', icon: '👶', color: '#1976d2' },
      { text: 'گوشی تلفن را بدهید', icon: '📱', color: '#0097a7' },
      { text: 'دکتر چی گفت؟', icon: '👨‍⚕️', color: '#0288d1' },
      { text: 'کی می‌رویم خانه؟', icon: '🏠', color: '#388e3c' },
      { text: 'دستم را بگیرید', icon: '🤝', color: '#f57c00' },
      { text: 'کاغذ و خودکار بدهید', icon: '📄', color: '#5d4037' },
      { text: 'ساعت چند است؟', icon: '⏰', color: '#7b1fa2' },
      { text: 'امروز چه روزی است؟', icon: '📅', color: '#303f9f' },
      { text: 'حرفم را متوجه شدید؟', icon: '👂', color: '#f57c00' }
    ]
  },
  {
    id: 'keyboard',
    name: 'کیبورد فارسی مستقیم',
    icon: '⌨️',
    color: '#37474f',
    bg: '#eceff1',
    isKeyboard: true,
    letters: [
      'ا',
      'آ',
      'ب',
      'پ',
      'ت',
      'ث',
      'ج',
      'چ',
      'ح',
      'خ',
      'د',
      'ذ',
      'ر',
      'ز',
      'ژ',
      'س',
      'ش',
      'ص',
      'ض',
      'ط',
      'ظ',
      'ع',
      'غ',
      'ف',
      'ق',
      'ک',
      'گ',
      'ل',
      'م',
      'ن',
      'و',
      'ه',
      'ی',
      'ئ',
      'ء',
      ' ',
      '،',
      '؟',
      '!'
    ],
    quickPhrases: [
      'سلام',
      'خداحافظ',
      'ممنون',
      'خوبم',
      'بله',
      'نه',
      'ان‌شاءالله',
      'التماس دعا'
    ]
  }
];

export function PersianAAC() {
  const [activeTab, setActiveTab] = useState('emergency');
  const [sentence, setSentence] = useState([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [alarmActive, setAlarmActive] = useState(false);
  const [highContrast, setHighContrast] = useState(false);

  // Play natural Web Speech API in Persian
  const speakText = (text) => {
    if (!text || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'fa-IR';
      utterance.rate = 0.85; // slightly slower for optimal clarity
      utterance.pitch = 1.0;

      // Find Persian voice if available
      const voices = window.speechSynthesis.getVoices();
      const faVoice = voices.find(
        (v) => v.lang.includes('fa') || v.lang.includes('IR')
      );
      if (faVoice) {
        utterance.voice = faVoice;
      }

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.error('Speech error:', e);
      setIsSpeaking(false);
    }
  };

  // Tactile feedback
  const triggerHaptic = () => {
    if ('vibrate' in navigator) {
      try {
        navigator.vibrate(40);
      } catch (e) {}
    }
  };

  // Handle Tile Click
  const handleTileClick = (item) => {
    triggerHaptic();
    speakText(item.text);
    setSentence((prev) => [...prev, item.text]);
  };

  // Handle Keyboard Letter Click
  const handleLetterClick = (letter) => {
    triggerHaptic();
    if (letter === ' ') {
      setSentence((prev) => [...prev, ' ']);
    } else {
      setSentence((prev) => {
        if (prev.length === 0 || prev[prev.length - 1] === ' ') {
          return [...prev, letter];
        }
        // append to last token
        const next = [...prev];
        next[next.length - 1] = next[next.length - 1] + letter;
        return next;
      });
    }
  };

  // Speak full sentence
  const handleSpeakSentence = () => {
    const fullText = sentence.join(' ');
    if (fullText.trim()) {
      speakText(fullText);
    }
  };

  // Backspace last item
  const handleBackspace = () => {
    triggerHaptic();
    setSentence((prev) => prev.slice(0, -1));
  };

  // Clear sentence
  const handleClear = () => {
    triggerHaptic();
    setSentence([]);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  };

  // Emergency Alarm Sound using Web Audio API
  const handleEmergencyAlarm = () => {
    triggerHaptic();
    setAlarmActive(true);
    speakText('کمک! لطفاً پرستار یا همراه سریعاً بیاید!');

    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(800, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(
        1400,
        audioCtx.currentTime + 0.3
      );
      osc.frequency.exponentialRampToValueAtTime(
        800,
        audioCtx.currentTime + 0.6
      );

      gain.gain.setValueAtTime(0.5, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 1.2);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 1.2);
    } catch (e) {
      console.warn('AudioContext alarm error:', e);
    }

    setTimeout(() => setAlarmActive(false), 2000);
  };

  const currentCategory =
    CATEGORIES.find((c) => c.id === activeTab) || CATEGORIES[0];

  return (
    <div
      className={`persian-aac-app ${highContrast ? 'theme-high-contrast' : ''}`}
      dir="rtl"
    >
      {/* Top Header */}
      <header className="aac-header">
        <div className="aac-header-right">
          <div className="aac-logo">هم‌صدا</div>
          <div className="aac-subtitle">
            ارتباط‌یار فارسی (AAC) ویژه بیماران ICU و توانبخشی
          </div>
        </div>

        <div className="aac-header-left">
          <button
            className={`btn-emergency ${alarmActive ? 'is-active' : ''}`}
            onClick={handleEmergencyAlarm}
            title="احضار فوری پرستار و صدای زنگ خطر"
          >
            <span className="emergency-icon">🚨</span>
            <span className="emergency-text">احضار فوری پرستار</span>
          </button>

          <button
            className="btn-toggle-contrast"
            onClick={() => setHighContrast(!highContrast)}
            title="کنتراست بالا / حالت شب"
          >
            {highContrast ? '☀️ حالت عادی' : '🌙 دید در شب'}
          </button>
        </div>
      </header>

      {/* Sentence / Speech Output Bar */}
      <div className="aac-speech-bar">
        <div className="sentence-display">
          {sentence.length === 0 ? (
            <span className="sentence-placeholder">
              برای بیان خواسته، دکمه‌های زیر را لمس کنید...
            </span>
          ) : (
            sentence.map((word, idx) => (
              <span key={idx} className="sentence-chip">
                {word}
                <button
                  className="chip-remove"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSentence((prev) => prev.filter((_, i) => i !== idx));
                  }}
                >
                  ×
                </button>
              </span>
            ))
          )}
        </div>

        <div className="speech-controls">
          <button
            className={`btn-control btn-speak ${isSpeaking ? 'speaking-pulse' : ''}`}
            onClick={handleSpeakSentence}
            disabled={sentence.length === 0}
            title="پخش صوت جمله کامل"
          >
            <span className="btn-icon">🔊</span>
            <span className="btn-label">خواندن جمله</span>
          </button>

          <button
            className="btn-control btn-backspace"
            onClick={handleBackspace}
            disabled={sentence.length === 0}
            title="حذف آخرین مورد"
          >
            <span className="btn-icon">⌫</span>
            <span className="btn-label">حذف یکی</span>
          </button>

          <button
            className="btn-control btn-clear"
            onClick={handleClear}
            disabled={sentence.length === 0}
            title="پاک کردن کل جمله"
          >
            <span className="btn-icon">🗑️</span>
            <span className="btn-label">پاک کردن</span>
          </button>
        </div>
      </div>

      {/* Category Tabs */}
      <nav className="aac-tabs-nav">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            className={`tab-btn ${activeTab === cat.id ? 'is-selected' : ''}`}
            onClick={() => {
              triggerHaptic();
              setActiveTab(cat.id);
            }}
            style={{
              borderColor: activeTab === cat.id ? cat.color : 'transparent',
              backgroundColor: activeTab === cat.id ? cat.bg : '#ffffff'
            }}
          >
            <span className="tab-icon">{cat.icon}</span>
            <span
              className="tab-name"
              style={{ color: activeTab === cat.id ? cat.color : '#333' }}
            >
              {cat.name}
            </span>
          </button>
        ))}
      </nav>

      {/* Main Board Grid Area */}
      <main className="aac-grid-container">
        {currentCategory.isKeyboard ? (
          <div className="keyboard-container">
            {/* Quick Phrases */}
            <div className="quick-phrases-row">
              <span className="section-label">عبارات سریع:</span>
              {currentCategory.quickPhrases.map((phrase, i) => (
                <button
                  key={i}
                  className="quick-phrase-btn"
                  onClick={() => {
                    triggerHaptic();
                    speakText(phrase);
                    setSentence((prev) => [...prev, phrase]);
                  }}
                >
                  {phrase}
                </button>
              ))}
            </div>

            {/* Letter Keys */}
            <div className="keyboard-grid">
              {currentCategory.letters.map((char, i) => (
                <button
                  key={i}
                  className={`key-btn ${char === ' ' ? 'key-space' : ''}`}
                  onClick={() => handleLetterClick(char)}
                >
                  {char === ' ' ? 'فاصله (Space)' : char}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="tiles-grid">
            {currentCategory.items.map((item, idx) => (
              <button
                key={idx}
                className={`aac-tile ${item.urgent ? 'tile-urgent' : ''}`}
                onClick={() => handleTileClick(item)}
                style={{
                  borderTopColor: item.color,
                  borderTopWidth: '6px'
                }}
              >
                <span className="tile-icon">{item.icon}</span>
                <span className="tile-text">{item.text}</span>
              </button>
            ))}
          </div>
        )}
      </main>

      {/* Discreet Footer */}
      <footer className="aac-footer">
        <span>
          سامانه ارتباط‌یار گفتاری فارسی (وقف عام و رایگان برای بیماران سراسر
          کشور)
        </span>
      </footer>
    </div>
  );
}

export default PersianAAC;
