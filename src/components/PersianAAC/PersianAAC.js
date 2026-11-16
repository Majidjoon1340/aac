import React, { useState, useEffect, useRef } from 'react';
import './PersianAAC.css';

// Rich, Comprehensive AAC Categories & Data customized for Iranian Patients (ICU, Stroke, Aphasia, ALS)
const CATEGORIES = [
  {
    id: 'emergency',
    name: '🚨 نیازهای فوری و بستری',
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
      { text: 'پتو بدهید (سردم است)', icon: '🥶', color: '#0288d1' },
      { text: 'گرمم است', icon: '🥵', color: '#e64a19' },
      { text: 'خارش دارم', icon: '🦟', color: '#fbc02d' },
      { text: 'درد شدید دارم', icon: '😫', color: '#d32f2f', urgent: true },
      { text: 'صبر کنید / دست نگه دارید', icon: '🛑', color: '#d32f2f' },
      { text: 'بله', icon: '✅', color: '#388e3c' },
      { text: 'خیر / نه', icon: '❌', color: '#d32f2f' },
      { text: 'دکتر را خبر کنید', icon: '🩺', color: '#d32f2f', urgent: true },
      { text: 'حالت تهوع دارم', icon: '🤢', color: '#558b2f' },
      { text: 'سرگیجه دارم', icon: '💫', color: '#f57c00' },
      { text: 'سرفه دارم / گلویم می‌سوزد', icon: '🗣️', color: '#e64a19' },
      { text: 'سرم تمام شده', icon: '💉', color: '#0288d1' },
      { text: 'اتصالات اذیتم می‌کند', icon: '🩹', color: '#6d4c41' },
      { text: 'دهانم خشک شده', icon: '👅', color: '#00897b' },
      { text: 'زبانم را تر کنید', icon: '🧊', color: '#0288d1' },
      { text: 'عینک من را بدهید', icon: '👓', color: '#455a64' }
    ]
  },
  {
    id: 'pain',
    name: '⚡ ارزیابی درد و اندام‌ها',
    icon: '⚡',
    color: '#e64a19',
    bg: '#fbe9e7',
    items: [
      { text: 'بدون درد (۰)', icon: '😊', color: '#388e3c' },
      { text: 'درد کم (۲)', icon: '🙂', color: '#689f38' },
      { text: 'درد متوسط (۴)', icon: '😐', color: '#fbc02d' },
      { text: 'درد زیاد (۶)', icon: '🙁', color: '#fb8c00' },
      { text: 'درد شدید (۸)', icon: '😣', color: '#f4511e' },
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
      { text: 'سینه‌ام و قلبم', icon: '🫀', color: '#d32f2f', urgent: true },
      { text: 'شکمم درد می‌کند', icon: '🫃', color: '#f57c00' },
      { text: 'کمرم و پشتم', icon: '🦴', color: '#5d4037' },
      { text: 'دست راستم', icon: '🦾', color: '#00796b' },
      { text: 'دست چپم', icon: '🦾', color: '#00796b' },
      { text: 'پای راستم', icon: '🦵', color: '#00796b' },
      { text: 'پای چپم', icon: '🦵', color: '#00796b' },
      { text: 'گلو و دهانم', icon: '👄', color: '#c2185b' },
      { text: 'جای سوزن و سرم', icon: '💉', color: '#1976d2' },
      { text: 'گردن و شانه‌ام', icon: '🧣', color: '#546e7a' },
      { text: 'پهلوی راستم', icon: '➡️', color: '#7cb342' },
      { text: 'پهلوی چپم', icon: '⬅️', color: '#7cb342' },
      { text: 'مسکن بدهید', icon: '💊', color: '#d32f2f', urgent: true }
    ]
  },
  {
    id: 'quick',
    name: '💬 گفتگوی روزمره',
    icon: '💬',
    color: '#0288d1',
    bg: '#e1f5fe',
    items: [
      { text: 'سلام', icon: '✋', color: '#0288d1' },
      { text: 'صبح بخیر', icon: '🌅', color: '#fbc02d' },
      { text: 'عصر بخیر', icon: '🌇', color: '#f57c00' },
      { text: 'شب بخیر', icon: '🌙', color: '#303f9f' },
      { text: 'خداحافظ', icon: '👋', color: '#0288d1' },
      { text: 'حالم بهتر است', icon: '👍', color: '#388e3c' },
      { text: 'حالم خوب نیست', icon: '👎', color: '#d32f2f' },
      { text: 'ممنون و متشکرم', icon: '🙏', color: '#00796b' },
      { text: 'دست شما درد نکند', icon: '🌸', color: '#c2185b' },
      { text: 'عذر می‌خواهم / ببخشید', icon: '🙇', color: '#7b1fa2' },
      { text: 'خواهش می‌کنم', icon: '🤲', color: '#00796b' },
      { text: 'بله موافقم', icon: '✅', color: '#388e3c' },
      { text: 'خیر مخالفم', icon: '❌', color: '#d32f2f' },
      { text: 'نمی‌دانم', icon: '🤷', color: '#616161' },
      { text: 'متوجه نشدم', icon: '❓', color: '#f57c00' },
      { text: 'دوباره تکرار کنید', icon: '🔁', color: '#0288d1' },
      { text: 'صبر کنید', icon: '⏳', color: '#fbc02d' },
      { text: 'کارم تمام شد', icon: '🏁', color: '#388e3c' },
      { text: 'ان‌شاءالله', icon: '🤲', color: '#00897b' },
      { text: 'التماس دعا', icon: '📿', color: '#5e35b1' }
    ]
  },
  {
    id: 'food',
    name: '🍲 غذا و نوشیدنی',
    icon: '🍲',
    color: '#2e7d32',
    bg: '#e8f5e9',
    items: [
      { text: 'آب ولرم', icon: '🥛', color: '#0288d1' },
      { text: 'آب خنک', icon: '🧊', color: '#00bcd4' },
      { text: 'چای کم‌رنگ', icon: '☕', color: '#6d4c41' },
      { text: 'شیر ولرم', icon: '🥛', color: '#78909c' },
      { text: 'سوپ داغ', icon: '🥣', color: '#e64a19' },
      { text: 'فرنی یا حریره', icon: '🍚', color: '#fbc02d' },
      { text: 'آبمیوه طبیعی', icon: '🧃', color: '#f57c00' },
      { text: 'کمپوت میوه', icon: '🥫', color: '#fb8c00' },
      { text: 'ماست یا کته‌ماست', icon: '🥣', color: '#43a047' },
      { text: 'نان نرم', icon: '🍞', color: '#8d6e63' },
      { text: 'عسل', icon: '🍯', color: '#ffa000' },
      { text: 'قاشق کوچک بدهید', icon: '🥄', color: '#546e7a' },
      { text: 'نی برای نوشیدن', icon: '🥤', color: '#0288d1' },
      { text: 'گرسنه‌ام', icon: '🍽️', color: '#e64a19' },
      { text: 'تشنه‌ام', icon: '🥤', color: '#0288d1' },
      { text: 'سیر شدم (کافیست)', icon: '✋', color: '#388e3c' },
      { text: 'غذا خیلی داغ است', icon: '🔥', color: '#d32f2f' },
      { text: 'غذا سرد شده', icon: '❄️', color: '#0288d1' },
      { text: 'نمی‌توانم قورت دهم', icon: '😣', color: '#d32f2f' },
      { text: 'بی‌اشتها هستم', icon: '🚫', color: '#757575' },
      { text: 'خوشمزه است', icon: '😋', color: '#e91e63' }
    ]
  },
  {
    id: 'fruits',
    name: '🍎 میوه و میان‌وعده',
    icon: '🍎',
    color: '#c2185b',
    bg: '#fce4ec',
    items: [
      { text: 'سیب رنده شده', icon: '🍏', color: '#43a047' },
      { text: 'موز له شده', icon: '🍌', color: '#fbc02d' },
      { text: 'پرتقال یا لیمو', icon: '🍊', color: '#f57c00' },
      { text: 'انگور بدون هسته', icon: '🍇', color: '#7b1fa2' },
      { text: 'هندوانه', icon: '🍉', color: '#e91e63' },
      { text: 'خرما', icon: '🌴', color: '#5d4037' },
      { text: 'مغز گردو و بادام', icon: '🥜', color: '#8d6e63' },
      { text: 'بیسکویت نرم', icon: '🍪', color: '#d84315' },
      { text: 'بستنی', icon: '🍦', color: '#ec407a' },
      { text: 'ژله خنک', icon: '🍮', color: '#ab47bc' },
      { text: 'شله‌زرد', icon: '🍧', color: '#fbc02d' },
      { text: 'پسته', icon: '🌰', color: '#689f38' }
    ]
  },
  {
    id: 'comfort',
    name: '🛏️ راحتی و بهداشت',
    icon: '🛏️',
    color: '#7b1fa2',
    bg: '#f3e5f5',
    items: [
      { text: 'سر تخت را بالا بیاورید', icon: '⬆️', color: '#7b1fa2' },
      { text: 'سر تخت را پایین ببرید', icon: '⬇️', color: '#7b1fa2' },
      { text: 'بالش من را درست کنید', icon: '🛏️', color: '#5e35b1' },
      { text: 'پتو را مرتب کنید', icon: '🛌', color: '#3949ab' },
      { text: 'پتو را کنار بزنید', icon: '☀️', color: '#f57c00' },
      { text: 'پای تخت را بلند کنید', icon: '📐', color: '#5c6bc0' },
      { text: 'چراغ را خاموش کنید', icon: '💡', color: '#424242' },
      { text: 'چراغ را روشن کنید', icon: '🔦', color: '#fbc02d' },
      { text: 'صدا زیاد است (سکوت)', icon: '🤫', color: '#d32f2f' },
      { text: 'تلویزیون را روشن کنید', icon: '📺', color: '#0288d1' },
      { text: 'تلویزیون را خاموش کنید', icon: '📴', color: '#616161' },
      { text: 'کانال را عوض کنید', icon: '🔀', color: '#00897b' },
      { text: 'دندان‌هایم را مسواک بزنید', icon: '🪥', color: '#00acc1' },
      { text: 'دست و صورتم را بشویید', icon: '🧼', color: '#26a69a' },
      { text: 'لب‌هایم خشک شده (کرم بزنید)', icon: '💄', color: '#ec407a' },
      { text: 'دستمال کاغذی بدهید', icon: '🧻', color: '#78909c' },
      { text: 'لگن بیاورید', icon: '🚽', color: '#f57c00', urgent: true },
      { text: 'پوشک را عوض کنید', icon: '🧷', color: '#ab47bc', urgent: true },
      { text: 'می‌خواهم بنشینم', icon: '🪑', color: '#388e3c' },
      { text: 'می‌خواهم بخوابم', icon: '😴', color: '#3f51b5' },
      { text: 'خوابم نمی‌برد', icon: '🥱', color: '#ef6c00' }
    ]
  },
  {
    id: 'emotions',
    name: '💖 احساسات و روحیه',
    icon: '💖',
    color: '#c2185b',
    bg: '#fce4ec',
    items: [
      { text: 'حالم خوب است', icon: '😊', color: '#388e3c' },
      { text: 'خوشحالم', icon: '😃', color: '#388e3c' },
      { text: 'نگرانم', icon: '😟', color: '#f57c00' },
      { text: 'ترسیده‌ام', icon: '😨', color: '#d32f2f' },
      { text: 'خسته‌ام', icon: '😫', color: '#795548' },
      { text: 'کلافه و عصبی‌ام', icon: '😤', color: '#d32f2f' },
      { text: 'دلتنگ شده‌ام', icon: '🥺', color: '#ab47bc' },
      { text: 'گریه‌ام می‌آید', icon: '😢', color: '#0288d1' },
      { text: 'آرامش دارم', icon: '🕊️', color: '#00acc1' },
      { text: 'امیدوارم', icon: '🌈', color: '#7cb342' },
      { text: 'دعا کنید برام', icon: '🤲', color: '#00897b' },
      { text: 'قرآن بخوانید', icon: '📖', color: '#2e7d32' },
      { text: 'آهنگ ملایم بگذارید', icon: '🎵', color: '#5c6bc0' },
      { text: 'پیشم بمانید (تنها نگذارید)', icon: '🫂', color: '#c2185b' },
      { text: 'می‌خواهم تنها باشم', icon: '🚪', color: '#616161' },
      { text: 'دوستتان دارم', icon: '❤️', color: '#d32f2f' },
      { text: 'به من روحیه بدهید', icon: '🤍', color: '#8e24aa' }
    ]
  },
  {
    id: 'family',
    name: '👨‍👩‍👧 خانواده و همراهان',
    icon: '👨‍👩‍👧',
    color: '#00796b',
    bg: '#e0f2f1',
    items: [
      { text: 'همسرم کجاست؟', icon: '💍', color: '#c2185b' },
      { text: 'بچه‌ها کجا هستند؟', icon: '👧', color: '#00897b' },
      { text: 'مادرم', icon: '👩', color: '#e91e63' },
      { text: 'پدرم', icon: '👨', color: '#3949ab' },
      { text: 'دخترم', icon: '👱‍♀️', color: '#d81b60' },
      { text: 'پسرم', icon: '👱‍♂️', color: '#1e88e5' },
      { text: 'برادرم', icon: '👦', color: '#43a047' },
      { text: 'خواهرم', icon: '👧', color: '#8e24aa' },
      { text: 'نوه‌ام', icon: '👶', color: '#fb8c00' },
      { text: 'زنگ بزنید به خانواده', icon: '📱', color: '#00acc1' },
      { text: 'تلفن را جلوی گوشم بگیرید', icon: '📞', color: '#00897b' },
      { text: 'دستم را بگیرید', icon: '🤝', color: '#e64a19' },
      { text: 'دکتر کی می‌آید؟', icon: '👨‍⚕️', color: '#1565c0' },
      { text: 'دکتر چی گفت؟', icon: '📋', color: '#00897b' },
      { text: 'کی مرخص می‌شوم؟', icon: '🏥', color: '#2e7d32' },
      { text: 'کی می‌رویم خانه؟', icon: '🏠', color: '#43a047' }
    ]
  },
  {
    id: 'actions',
    name: '🚶 کارها و حرکت',
    icon: '🚶',
    color: '#f57c00',
    bg: '#fff3e0',
    items: [
      { text: 'می‌خواهم بنشینم', icon: '🧘', color: '#f57c00' },
      { text: 'می‌خواهم بایستم', icon: '🧍', color: '#ef6c00' },
      { text: 'می‌خواهم راه بروم', icon: '🚶', color: '#2e7d32' },
      { text: 'می‌خواهم دراز بکشم', icon: '🛌', color: '#3949ab' },
      { text: 'بچرخم به راست', icon: '↪️', color: '#7b1fa2' },
      { text: 'بچرخم به چپ', icon: '↩️', color: '#7b1fa2' },
      { text: 'سوار ویلچر شوم', icon: '♿', color: '#0288d1' },
      { text: 'عصا بدهید', icon: '🦯', color: '#6d4c41' },
      { text: 'واکر را بیاورید', icon: '🦽', color: '#546e7a' },
      { text: 'برویم حیاط / هوای تازه', icon: '🌳', color: '#43a047' },
      { text: 'برویم حمام', icon: '🚿', color: '#00acc1' },
      { text: 'ماساژ بدهید', icon: '💆', color: '#ab47bc' },
      { text: 'پنجره را باز کنید', icon: '🪟', color: '#0288d1' },
      { text: 'نگاهم کنید', icon: '👀', color: '#e64a19' },
      { text: 'به حرفم گوش کنید', icon: '👂', color: '#00796b' }
    ]
  },
  {
    id: 'time_q',
    name: '⏰ زمان و سوالات',
    icon: '⏰',
    color: '#455a64',
    bg: '#eceff1',
    items: [
      { text: 'ساعت چند است؟', icon: '⌚', color: '#455a64' },
      { text: 'امروز چند شنبه است؟', icon: '📅', color: '#37474f' },
      { text: 'الان روز است یا شب؟', icon: '🌗', color: '#546e7a' },
      { text: 'کی نوبت داروست؟', icon: '💊', color: '#d32f2f' },
      { text: 'کی نوبت غذاست؟', icon: '🍲', color: '#2e7d32' },
      { text: 'چرا؟', icon: '❓', color: '#e64a19' },
      { text: 'کِی؟', icon: '⏰', color: '#0288d1' },
      { text: 'کجا؟', icon: '📍', color: '#c2185b' },
      { text: 'چه کسی؟', icon: '👤', color: '#7b1fa2' },
      { text: 'چطور؟', icon: '❔', color: '#00796b' },
      { text: 'چند تا؟', icon: '🔢', color: '#f57c00' },
      { text: 'عدد ۱', icon: '1️⃣', color: '#1976d2' },
      { text: 'عدد ۲', icon: '2️⃣', color: '#1976d2' },
      { text: 'عدد ۳', icon: '3️⃣', color: '#1976d2' },
      { text: 'عدد ۴', icon: '4️⃣', color: '#1976d2' },
      { text: 'عدد ۵', icon: '5️⃣', color: '#1976d2' }
    ]
  },
  {
    id: 'keyboard',
    name: '⌨️ کیبورد فارسی',
    icon: '⌨️',
    color: '#37474f',
    bg: '#eceff1',
    isKeyboard: true,
    letters: [
      'ا',
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
      'آ',
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

  // High-fidelity Persian Speech via Azure Neural Voice with fallback to Web Speech API
  const speakText = async (text) => {
    if (!text) return;
    setIsSpeaking(true);

    // 1. Try Microsoft Azure Neural Persian Voice (crystal clear natural Persian pronunciation)
    try {
      const ssml = `<speak version="1.0" xml:lang="fa-IR"><voice xml:lang="fa-IR" name="fa-IR-DilaraNeural">${text}</voice></speak>`;
      const response = await fetch(
        'https://eastus.tts.speech.microsoft.com/cognitiveservices/v1',
        {
          method: 'POST',
          headers: {
            'Ocp-Apim-Subscription-Key': '910a3256e6aa4b4daf631cd0f550c995',
            'Content-Type': 'application/ssml+xml',
            'X-Microsoft-OutputFormat': 'audio-16khz-32kbitrate-mono-mp3',
            'User-Agent': 'PersianAAC'
          },
          body: ssml
        }
      );

      if (response.ok) {
        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        audio.onended = () => {
          setIsSpeaking(false);
          URL.revokeObjectURL(audioUrl);
        };
        audio.onerror = () => {
          setIsSpeaking(false);
          URL.revokeObjectURL(audioUrl);
        };
        await audio.play();
        return;
      }
    } catch (err) {
      console.warn(
        'Azure TTS unavailable, falling back to Web Speech API:',
        err
      );
    }

    // 2. Fallback to Web Speech API
    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'fa-IR';
        utterance.rate = 0.85;

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
        return;
      } catch (e) {
        console.error('Speech error:', e);
      }
    }

    setIsSpeaking(false);
  };

  // Tactile feedback
  const triggerHaptic = () => {
    if ('vibrate' in navigator) {
      try {
        navigator.vibrate(40);
      } catch (e) {}
    }
  };

  // Play audio chime for emergency
  const playEmergencyAlarm = () => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(880, audioCtx.currentTime); // A5
      osc.frequency.exponentialRampToValueAtTime(
        440,
        audioCtx.currentTime + 0.3
      );

      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.3);
    } catch (e) {
      console.error('AudioContext alarm error:', e);
    }
  };

  // Handle Tile Click
  const handleTileClick = (item) => {
    triggerHaptic();
    speakText(item.text);
    setSentence((prev) => [...prev, item.text]);
  };

  // Handle Keyboard Letter
  const handleLetterClick = (char) => {
    triggerHaptic();
    setSentence((prev) => {
      if (prev.length === 0) return [char];
      const lastIndex = prev.length - 1;
      const updated = [...prev];
      updated[lastIndex] = updated[lastIndex] + char;
      return updated;
    });
  };

  // Emergency Call
  const handleEmergencyCall = () => {
    triggerHaptic();
    setAlarmActive(true);
    playEmergencyAlarm();
    speakText(
      'هشدار فوری! پرستار لطفاً به این اتاق بیایید، بیمار نیاز فوری به کمک دارد.'
    );
    setTimeout(() => setAlarmActive(false), 2000);
  };

  // Speak Complete Sentence
  const speakSentence = () => {
    if (sentence.length === 0) return;
    const fullSentence = sentence.join(' ');
    speakText(fullSentence);
  };

  // Backspace
  const handleBackspace = () => {
    triggerHaptic();
    setSentence((prev) => prev.slice(0, -1));
  };

  // Clear All
  const handleClear = () => {
    triggerHaptic();
    setSentence([]);
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
          <span className="aac-logo">هم‌صدا</span>
          <span className="aac-subtitle">
            سامانه ارتباط‌یار گفتاری فارسی (بیماران و سالمندان)
          </span>
        </div>
        <div className="aac-header-left">
          <button
            className={`btn-emergency ${alarmActive ? 'is-active' : ''}`}
            onClick={handleEmergencyCall}
            title="احضار فوری پرستار و زنگ خطر"
          >
            <span className="emergency-icon">🚨</span>
            <span className="emergency-label">احضار پرستار</span>
          </button>
          <button
            className="btn-toggle-contrast"
            onClick={() => setHighContrast(!highContrast)}
            title="حالت دید در شب / کنتراست بالا"
          >
            {highContrast ? '☀️ عادی' : '🌙 دید در شب'}
          </button>
        </div>
      </header>

      {/* Prominent Category Navigation Bar - Positioned at top */}
      <section className="aac-category-section">
        <div className="category-section-header">
          <span className="category-section-title">📂 انتخاب دسته‌بندی:</span>
          <span className="category-scroll-hint">
            👈 جهت مشاهده سایر موارد ورق بزنید 👉
          </span>
        </div>
        <nav className="aac-tabs-nav" aria-label="دسته‌بندی‌های گفتاری">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              className={`tab-btn ${activeTab === cat.id ? 'is-selected' : ''}`}
              onClick={() => {
                triggerHaptic();
                setActiveTab(cat.id);
              }}
              style={{
                borderColor: activeTab === cat.id ? cat.color : '#e2e8f0',
                backgroundColor: activeTab === cat.id ? cat.bg : '#ffffff'
              }}
            >
              <span className="tab-icon">{cat.icon}</span>
              <span
                className="tab-name"
                style={{
                  color: activeTab === cat.id ? cat.color : '#334155',
                  fontWeight: activeTab === cat.id ? '800' : '600'
                }}
              >
                {cat.name}
              </span>
              {activeTab === cat.id && (
                <span
                  className="tab-active-indicator"
                  style={{ backgroundColor: cat.color }}
                />
              )}
            </button>
          ))}
        </nav>
      </section>

      {/* Sentence / Speech Output Bar */}
      <section className="aac-speech-bar">
        <div className="sentence-display">
          {sentence.length === 0 ? (
            <span className="sentence-placeholder">
              👈 روی آیکون‌ها بزنید تا جمله ساخته و با صدای فارسی خوانده شود...
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
                  title="حذف"
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
            onClick={speakSentence}
            disabled={sentence.length === 0}
            title="خواندن کل جمله با صدای طبیعی فارسی"
          >
            <span className="btn-icon">🔊</span>
            <span>خواندن جمله</span>
          </button>
          <button
            className="btn-control btn-backspace"
            onClick={handleBackspace}
            disabled={sentence.length === 0}
            title="حذف آخرین کلمه"
          >
            <span className="btn-icon">⌫</span>
            <span>حذف یکی</span>
          </button>
          <button
            className="btn-control btn-clear"
            onClick={handleClear}
            disabled={sentence.length === 0}
            title="پاک کردن تمام جمله"
          >
            <span className="btn-icon">🗑️</span>
            <span>پاک کردن</span>
          </button>
        </div>
      </section>

      {/* Main Board Grid Area - Full Touch-Scrollable */}
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

      {/* Footer */}
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
