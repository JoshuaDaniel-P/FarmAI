import React, { useState, useEffect } from 'react';
import { useFarm } from '../context/FarmContext';
import { voiceAssistantService } from '../services/voiceAssistantService';
import { SUPPORTED_LANGUAGES, t, translateText } from '../services/i18n';
import { LanguageSelectorModal } from './LanguageSelectorModal';

export const AIAssistantScreen: React.FC = () => {
  const {
    setCurrentScreen,
    chatMessages,
    sendAssistantQuery,
    triggerIrrigation,
    selectedLanguage,
    setSelectedLanguage,
    isLanguageModalOpen,
    setIsLanguageModalOpen,
  } = useFarm();
  const [isListening, setIsListening] = useState<boolean>(false);
  const [inputText, setInputText] = useState<string>('');
  const [listeningText, setListeningText] = useState<string>(t('tapToSpeak', selectedLanguage));

  useEffect(() => {
    if (!isListening) {
      setListeningText(t('tapToSpeak', selectedLanguage));
    }
  }, [selectedLanguage, isListening]);

  const currentLangObj = SUPPORTED_LANGUAGES.find((l) => l.code === selectedLanguage) || SUPPORTED_LANGUAGES[0];

  const quickPrompts = [
    { label: t('howIsMyField', selectedLanguage), icon: 'eco' },
    {
      label: selectedLanguage === 'te'
        ? 'సెక్టార్ 3 కి నీరు పెట్టు'
        : selectedLanguage === 'hi'
        ? 'सेक्टर 3 में पानी चालू करो'
        : selectedLanguage === 'ta'
        ? 'பிரிவு 3 இல் தண்ணீர் பாய்ச்சு'
        : selectedLanguage === 'kn'
        ? 'ವಲಯ 3 ಕ್ಕೆ ನೀರು ಹಾಯಿಸಿ'
        : 'Start irrigation in Sector 3',
      icon: 'water_drop',
    },
    {
      label: selectedLanguage === 'te'
        ? 'సెక్టార్ 3 లో నేల తేమ ఎంత?'
        : selectedLanguage === 'hi'
        ? 'सेक्टर 3 में नमी कितनी है?'
        : selectedLanguage === 'ta'
        ? 'பிரிவு 3 இல் மண் ஈரப்பதம் என்ன?'
        : selectedLanguage === 'kn'
        ? 'ವಲಯ 3 ರಲ್ಲಿ ತೇವಾಂಶ ಎಷ್ಟು?'
        : 'What is the moisture in Sector 3?',
      icon: 'opacity',
    },
    {
      label: selectedLanguage === 'te'
        ? 'ఈరోజు వరి మార్కెట్ రేటు ఎంత?'
        : selectedLanguage === 'hi'
        ? 'आज धान का मंडी भाव क्या है?'
        : selectedLanguage === 'ta'
        ? 'இன்று நெல் சந்தை விலை என்ன?'
        : selectedLanguage === 'kn'
        ? 'ಇಂದು ಭತ್ತದ ಮಾರುಕಟ್ಟೆ ದರ ಎಷ್ಟು?'
        : 'What is today Paddy market rate?',
      icon: 'trending_up',
    },
    {
      label: selectedLanguage === 'te'
        ? 'ఎరువుల మోతాదు మరియు పిచికారీ ఎంత?'
        : selectedLanguage === 'hi'
        ? 'उर्वरक की मात्रा और छिड़काव कितना करें?'
        : selectedLanguage === 'ta'
        ? 'உர அளவு மற்றும் தெளிப்பு அளவு என்ன?'
        : selectedLanguage === 'kn'
        ? 'ಗೊಬ್ಬರದ ಪ್ರಮಾಣ ಮತ್ತು ಸಿಂಪಡಣೆ ಎಷ್ಟು?'
        : 'Fertilizer and spray dosage guide',
      icon: 'science',
    },
    {
      label: selectedLanguage === 'te'
        ? 'డ్రోన్ ద్వారా కలుపు ఏమైనా గుర్తించబడిందా?'
        : selectedLanguage === 'hi'
        ? 'क्या ड्रोन द्वारा कोई खरपतवार मिला?'
        : selectedLanguage === 'ta'
        ? 'ட்ரோன் மூலம் களைகள் கண்டறியப்பட்டதா?'
        : selectedLanguage === 'kn'
        ? 'ಡ್ರೋನ್‌ನಿಂದ ಕಳೆ ಪತ್ತೆಯಾಗಿದೆಯೇ?'
        : 'Any weeds detected by drone?',
      icon: 'grass',
    },
    {
      label: selectedLanguage === 'te'
        ? 'పంట తెగుళ్ళు మరియు నివారణ సూచనలు'
        : selectedLanguage === 'hi'
        ? 'फसल रोग और रोकथाम सलाह'
        : selectedLanguage === 'ta'
        ? 'பயிர் நோய்கள் மற்றும் தடுப்பு ஆலோசனைகள்'
        : selectedLanguage === 'kn'
        ? 'ಬೆಳೆ ರೋಗಗಳು ಮತ್ತು ಮುನ್ನೆಚ್ಚರಿಕೆ ಸಲಹೆಗಳು'
        : 'Crop diseases and prevention advice',
      icon: 'coronavirus',
    },
    {
      label: selectedLanguage === 'te'
        ? 'పొలం మ్యాప్ మరియు సరిహద్దు వివరాలు'
        : selectedLanguage === 'hi'
        ? 'खेत का नक्शा और सीमा विवरण'
        : selectedLanguage === 'ta'
        ? 'நில வரைபடம் மற்றும் எல்லை விவரங்கள்'
        : selectedLanguage === 'kn'
        ? 'ಜಮೀನಿನ ನಕ್ಷೆ ಮತ್ತು ಗಡಿ ವಿವರಗಳು'
        : 'Show field map and boundary',
      icon: 'map',
    },
    {
      label: selectedLanguage === 'te'
        ? 'ఈరోజు వాతావరణం మరియు ఉష్ణోగ్రత'
        : selectedLanguage === 'hi'
        ? 'आज का मौसम और तापमान'
        : selectedLanguage === 'ta'
        ? 'இன்றைய வானிலை மற்றும் வெப்பநிலை'
        : selectedLanguage === 'kn'
        ? 'ಇಂದಿನ ಹವಾಮಾನ ಮತ್ತು ತಾಪಮಾನ'
        : 'Today weather and temperature',
      icon: 'thermostat',
    },
  ];

  const toggleListening = () => {
    if (isListening) {
      setIsListening(false);
      setListeningText(t('tapToSpeak', selectedLanguage));
      voiceAssistantService.stopSpeaking();
    } else {
      setIsListening(true);
      setListeningText(t('listening', selectedLanguage));
      voiceAssistantService.listen(
        (transcript) => {
          setIsListening(false);
          setListeningText(t('tapToSpeak', selectedLanguage));
          sendAssistantQuery(transcript);
        },
        (err) => {
          console.warn('Voice error:', err);
          setIsListening(false);
          setListeningText(t('voiceTimeout', selectedLanguage));
        },
        selectedLanguage
      );
    }
  };

  const handleSendText = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendAssistantQuery(inputText);
    setInputText('');
  };

  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col font-body-md overflow-hidden pb-[90px] md:pb-8">
      {/* TopAppBar */}
      <header className="docked full-width top-0 bg-background flex flex-col justify-between px-margin-mobile pt-sm pb-xs w-full max-w-screen-xl mx-auto flat no shadows z-50 border-b border-surface-container-highest/40">
        <div className="flex items-center justify-between w-full h-16">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentScreen('dashboard')}
              title={t('back', selectedLanguage)}
              aria-label={t('back', selectedLanguage)}
              className="p-2 rounded-full hover:bg-surface-container-high transition-colors text-on-surface-variant flex items-center justify-center"
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'wght' 400, 'FILL' 0" }}>
                arrow_back
              </span>
            </button>
            <div className="flex flex-col">
              <h1 className="font-headline-md text-headline-md-mobile text-primary font-bold">{t('farmAssistant', selectedLanguage)}</h1>
              <span className="text-[11px] text-primary/80 font-medium">
                🗣️ {currentLangObj.nativeName} ({currentLangObj.speechLocale})
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* TOP-RIGHT TRANSLATE PIN BUTTON */}
            <button
              onClick={() => setIsLanguageModalOpen(true)}
              className="w-10 h-10 rounded-full bg-surface-container hover:bg-surface-container-high text-primary flex items-center justify-center border border-primary/30 transition-all shadow-sm"
              title={t('selectLanguage', selectedLanguage)}
              aria-label={t('selectLanguage', selectedLanguage)}
            >
              <span className="material-symbols-outlined text-[24px]">translate</span>
            </button>
          </div>
        </div>

        {/* INLINE LANGUAGE SELECTOR CHIPS */}
        <div className="flex gap-2 overflow-x-auto pb-2 pt-1 scrollbar-none">
          {SUPPORTED_LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setSelectedLanguage(lang.code);
                voiceAssistantService.stopSpeaking();
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap border ${
                selectedLanguage === lang.code
                  ? 'bg-primary text-on-primary border-primary shadow-sm scale-105'
                  : 'bg-surface-container text-on-surface-variant border-surface-variant hover:bg-surface-container-high'
              }`}
            >
              <span>{lang.flag}</span>
              <span>{lang.nativeName}</span>
            </button>
          ))}
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="flex-1 flex flex-col items-center justify-between w-full max-w-screen-md mx-auto px-margin-mobile py-md">
        {/* Chat History */}
        <div className="w-full flex flex-col gap-md overflow-y-auto mb-auto max-h-[45vh] p-2">
          {chatMessages.map((msg) =>
            msg.sender === 'user' ? (
              <div key={msg.id} className="flex flex-col items-end w-full">
                <div className="bg-surface-container-high text-on-surface p-4 rounded-t-xl rounded-bl-xl max-w-[85%] border border-surface-variant/50 shadow-md">
                  <p className="font-body-lg text-body-lg">{translateText(msg.text, selectedLanguage)}</p>
                </div>
                <span className="font-label-sm text-label-sm text-on-surface-variant mt-2 mr-2">{t('farmerSpeaker', selectedLanguage)} • {msg.timestamp}</span>
              </div>
            ) : (
              <div key={msg.id} className="flex flex-col items-start w-full">
                <div className="bg-primary-container text-on-primary-container p-5 rounded-t-xl rounded-br-xl max-w-[90%] border border-primary/20 shadow-[0_4px_16px_rgba(0,53,15,0.2)]">
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary mt-1" style={{ fontVariationSettings: "'wght' 600, 'FILL' 1" }}>
                      smart_toy
                    </span>
                    <div>
                      <p className="font-body-lg text-body-lg leading-relaxed">{translateText(msg.text, selectedLanguage)}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2 border-t border-primary/20 pt-3 flex-wrap">
                    <button
                      onClick={() => voiceAssistantService.speak(translateText(msg.text, selectedLanguage), selectedLanguage)}
                      className="flex items-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary font-label-sm text-label-sm px-3 py-2 rounded-full transition-colors font-bold"
                      title={`${t('listen', selectedLanguage)} (${currentLangObj.nativeName})`}
                    >
                      <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'wght' 400, 'FILL' 1" }}>
                        volume_up
                      </span>
                      {t('listen', selectedLanguage)} ({currentLangObj.nativeName})
                    </button>
                    {(msg.text.includes('irrigation') || msg.text.includes('నీరు') || msg.text.includes('సిंचाई') || msg.text.includes('பாசனம்') || msg.text.includes('ನೀರಾವರಿ')) && (
                      <button
                        onClick={triggerIrrigation}
                        className="flex items-center gap-2 bg-surface-container/50 hover:bg-surface-container text-on-surface-variant font-label-sm text-label-sm px-3 py-2 rounded-full transition-colors border border-outline-variant/30"
                        title={t('startWater', selectedLanguage)}
                      >
                        <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'wght' 400, 'FILL' 0" }}>
                          water_drop
                        </span>
                        {t('startWater', selectedLanguage)}
                      </button>
                    )}
                    {(msg.text.includes('disease') || msg.text.includes('తెగులు') || msg.text.includes('మచ్చ') || msg.text.includes('रोग') || msg.text.includes('நோய்') || msg.text.includes('ರೋಗ') || msg.text.includes('weed') || msg.text.includes('కలుపు') || msg.text.includes('खरपतवार')) && (
                      <button
                        onClick={() => setCurrentScreen('disease-weed')}
                        className="flex items-center gap-2 bg-surface-container/50 hover:bg-surface-container text-on-surface-variant font-label-sm text-label-sm px-3 py-2 rounded-full transition-colors border border-outline-variant/30"
                        title={t('scanCropLeaf', selectedLanguage)}
                      >
                        <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'wght' 400, 'FILL' 0" }}>
                          photo_camera
                        </span>
                        {t('scanCropLeaf', selectedLanguage)}
                      </button>
                    )}
                    {(msg.text.includes('market') || msg.text.includes('ధర') || msg.text.includes('రేటు') || msg.text.includes('मंडी') || msg.text.includes('भाव') || msg.text.includes('சந்தை') || msg.text.includes('ಮಾರುಕಟ್ಟೆ') || msg.text.includes('yield') || msg.text.includes('దిగుబడి') || msg.text.includes('उपज')) && (
                      <button
                        onClick={() => setCurrentScreen('analytics')}
                        className="flex items-center gap-2 bg-surface-container/50 hover:bg-surface-container text-on-surface-variant font-label-sm text-label-sm px-3 py-2 rounded-full transition-colors border border-outline-variant/30"
                        title={t('marketPriceTrends', selectedLanguage)}
                      >
                        <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'wght' 400, 'FILL' 0" }}>
                          trending_up
                        </span>
                        {t('marketPriceTrends', selectedLanguage)}
                      </button>
                    )}
                    {(msg.text.includes('boundary') || msg.text.includes('map') || msg.text.includes('సరిహద్దు') || msg.text.includes('నక్ష') || msg.text.includes('सीमा') || msg.text.includes('வரைபடம்') || msg.text.includes('ಗಡಿ')) && (
                      <button
                        onClick={() => setCurrentScreen('field-setup')}
                        className="flex items-center gap-2 bg-surface-container/50 hover:bg-surface-container text-on-surface-variant font-label-sm text-label-sm px-3 py-2 rounded-full transition-colors border border-outline-variant/30"
                        title={t('fieldSectorMap', selectedLanguage)}
                      >
                        <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'wght' 400, 'FILL' 0" }}>
                          map
                        </span>
                        {t('fieldSectorMap', selectedLanguage)}
                      </button>
                    )}
                  </div>
                </div>
                <span className="font-label-sm text-label-sm text-on-surface-variant mt-2 ml-2">{t('assistantSpeaker', selectedLanguage)} • {msg.timestamp}</span>
              </div>
            )
          )}
        </div>

        {/* Quick Voice Query Suggestions */}
        <div className="w-full flex gap-2 overflow-x-auto py-2 scrollbar-none">
          {quickPrompts.map((q, idx) => (
            <button
              key={idx}
              onClick={() => sendAssistantQuery(q.label)}
              className="px-3 py-1.5 bg-surface-container-high hover:bg-surface-bright text-on-surface text-xs rounded-full border border-surface-variant flex items-center gap-1.5 whitespace-nowrap transition-all shadow-sm"
              title={q.label}
            >
              <span className="material-symbols-outlined text-primary text-sm">{q.icon}</span>
              <span>{q.label}</span>
            </button>
          ))}
        </div>

        {/* Pulse Animation & Voice Waveform Area */}
        <div className="w-full flex flex-col items-center justify-end flex-shrink-0 mt-3 relative">
          {/* Waveform Visualization */}
          {isListening && (
            <div className="absolute -top-16 w-full max-w-[200px] h-12 flex items-end justify-center gap-1">
              <div className="w-2 bg-primary rounded-t-full waveform-bar" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 bg-primary rounded-t-full waveform-bar" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 bg-primary rounded-t-full waveform-bar" style={{ animationDelay: '0.3s' }}></div>
              <div className="w-2 bg-primary rounded-t-full waveform-bar" style={{ animationDelay: '0.4s' }}></div>
              <div className="w-2 bg-primary rounded-t-full waveform-bar" style={{ animationDelay: '0.5s' }}></div>
              <div className="w-2 bg-primary rounded-t-full waveform-bar" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 bg-primary rounded-t-full waveform-bar" style={{ animationDelay: '0.1s' }}></div>
            </div>
          )}

          {/* Large Microphone Button */}
          <div className="relative flex items-center justify-center my-3">
            {isListening && (
              <>
                <div className="absolute inset-0 bg-primary/20 rounded-full pulse-ring-voice z-0"></div>
                <div className="absolute inset-0 bg-primary/10 rounded-full pulse-ring-voice z-0" style={{ animationDelay: '1s' }}></div>
              </>
            )}
            <button
              onClick={toggleListening}
              title={isListening ? t('stopListening', selectedLanguage) : t('tapToSpeak', selectedLanguage)}
              aria-label={isListening ? t('stopListening', selectedLanguage) : t('tapToSpeak', selectedLanguage)}
              className={`relative z-10 w-20 h-20 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(144,215,146,0.3)] hover:scale-105 active:scale-95 transition-transform duration-200 cursor-pointer ${
                isListening ? 'bg-error text-on-error' : 'bg-primary text-on-primary'
              }`}
            >
              <span className="material-symbols-outlined text-[40px]" style={{ fontVariationSettings: "'wght' 600, 'FILL' 1" }}>
                {isListening ? 'stop' : 'mic'}
              </span>
            </button>
          </div>
          <p className="font-label-lg text-label-lg text-on-surface-variant mb-3 text-center">{listeningText}</p>

          {/* Text input form */}
          <form onSubmit={handleSendText} className="w-full flex gap-2">
            <input
              type="text"
              className="flex-1 bg-surface-container border border-surface-variant rounded-full px-4 py-3 text-on-surface focus:outline-none focus:border-primary"
              placeholder={t('askAnything', selectedLanguage)}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              aria-label={t('askAnything', selectedLanguage)}
            />
            <button
              type="submit"
              title={t('send', selectedLanguage)}
              aria-label={t('send', selectedLanguage)}
              className="bg-primary text-on-primary px-5 py-3 rounded-full font-label-lg hover:bg-primary-fixed transition-colors flex items-center justify-center"
            >
              <span className="material-symbols-outlined">send</span>
            </button>
          </form>
        </div>
      </main>

      {/* Language Selector Modal */}
      <LanguageSelectorModal
        isOpen={isLanguageModalOpen}
        onClose={() => setIsLanguageModalOpen(false)}
        currentLanguage={selectedLanguage}
        onSelectLanguage={setSelectedLanguage}
      />
    </div>
  );
};

