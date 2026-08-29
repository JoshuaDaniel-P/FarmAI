import React, { useState } from 'react';
import { useFarm } from '../context/FarmContext';
import { voiceAssistantService } from '../services/voiceAssistantService';
import { t } from '../services/i18n';
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
          setListeningText('Listening timed out. Tap again or type.');
        }
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
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCurrentScreen('dashboard')}
              className="p-2 rounded-full hover:bg-surface-container-high transition-colors text-on-surface-variant flex items-center justify-center"
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'wght' 400, 'FILL' 0" }}>
                arrow_back
              </span>
            </button>
            <h1 className="font-headline-md text-headline-md-mobile text-primary font-bold">{t('farmAssistant', selectedLanguage)}</h1>
          </div>

          <div className="flex items-center gap-2">
            {/* TOP-RIGHT TRANSLATE PIN BUTTON */}
            <button
              onClick={() => setIsLanguageModalOpen(true)}
              className="w-10 h-10 rounded-full bg-surface-container hover:bg-surface-container-high text-primary flex items-center justify-center border border-primary/30 transition-all shadow-sm"
              title={t('selectLanguage', selectedLanguage)}
            >
              <span className="material-symbols-outlined text-[24px]">translate</span>
            </button>

            <button
              onClick={() => sendAssistantQuery('How is my field?')}
              className="px-3 py-1 bg-surface-container-high text-on-surface text-label-sm rounded-full border border-surface-variant hover:bg-surface-bright"
            >
              Status
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="flex-1 flex flex-col items-center justify-between w-full max-w-screen-md mx-auto px-margin-mobile py-md">
        {/* Chat History */}
        <div className="w-full flex flex-col gap-md overflow-y-auto mb-auto max-h-[50vh] p-2">
          {chatMessages.map((msg) =>
            msg.sender === 'user' ? (
              <div key={msg.id} className="flex flex-col items-end w-full">
                <div className="bg-surface-container-high text-on-surface p-4 rounded-t-xl rounded-bl-xl max-w-[85%] border border-surface-variant/50 shadow-md">
                  <p className="font-body-lg text-body-lg">{msg.text}</p>
                </div>
                <span className="font-label-sm text-label-sm text-on-surface-variant mt-2 mr-2">Farmer • {msg.timestamp}</span>
              </div>
            ) : (
              <div key={msg.id} className="flex flex-col items-start w-full">
                <div className="bg-primary-container text-on-primary-container p-5 rounded-t-xl rounded-br-xl max-w-[90%] border border-primary/20 shadow-[0_4px_16px_rgba(0,53,15,0.2)]">
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary mt-1" style={{ fontVariationSettings: "'wght' 600, 'FILL' 1" }}>
                      smart_toy
                    </span>
                    <div>
                      <p className="font-body-lg text-body-lg leading-relaxed">{msg.text}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2 border-t border-primary/20 pt-3 flex-wrap">
                    <button
                      onClick={() => voiceAssistantService.speak(msg.text)}
                      className="flex items-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary font-label-sm text-label-sm px-3 py-2 rounded-full transition-colors"
                    >
                      <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'wght' 400, 'FILL' 1" }}>
                        volume_up
                      </span>
                      {t('listen', selectedLanguage)}
                    </button>
                    {msg.text.includes('irrigation') && (
                      <button
                        onClick={triggerIrrigation}
                        className="flex items-center gap-2 bg-surface-container/50 hover:bg-surface-container text-on-surface-variant font-label-sm text-label-sm px-3 py-2 rounded-full transition-colors border border-outline-variant/30"
                      >
                        <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'wght' 400, 'FILL' 0" }}>
                          water_drop
                        </span>
                        {t('startWater', selectedLanguage)}
                      </button>
                    )}
                  </div>
                </div>
                <span className="font-label-sm text-label-sm text-on-surface-variant mt-2 ml-2">Assistant • {msg.timestamp}</span>
              </div>
            )
          )}
        </div>

        {/* Pulse Animation & Voice Waveform Area */}
        <div className="w-full flex flex-col items-center justify-end flex-shrink-0 mt-6 relative">
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
          <div className="relative flex items-center justify-center my-4">
            {isListening && (
              <>
                <div className="absolute inset-0 bg-primary/20 rounded-full pulse-ring-voice z-0"></div>
                <div className="absolute inset-0 bg-primary/10 rounded-full pulse-ring-voice z-0" style={{ animationDelay: '1s' }}></div>
              </>
            )}
            <button
              onClick={toggleListening}
              className={`relative z-10 w-20 h-20 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(144,215,146,0.3)] hover:scale-105 active:scale-95 transition-transform duration-200 cursor-pointer ${
                isListening ? 'bg-error text-on-error' : 'bg-primary text-on-primary'
              }`}
            >
              <span className="material-symbols-outlined text-[40px]" style={{ fontVariationSettings: "'wght' 600, 'FILL' 1" }}>
                {isListening ? 'stop' : 'mic'}
              </span>
            </button>
          </div>
          <p className="font-label-lg text-label-lg text-on-surface-variant mb-4 text-center">{listeningText}</p>

          {/* Text input form */}
          <form onSubmit={handleSendText} className="w-full flex gap-2">
            <input
              type="text"
              className="flex-1 bg-surface-container border border-surface-variant rounded-full px-4 py-3 text-on-surface focus:outline-none focus:border-primary"
              placeholder={t('askAnything', selectedLanguage)}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <button
              type="submit"
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
