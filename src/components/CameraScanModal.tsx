import React, { useState } from 'react';
import { imageAnalysisService, DiseaseAnalysisResult } from '../services/imageAnalysisService';
import { useFarm } from '../context/FarmContext';
import { t, translateCrop, translateText } from '../services/i18n';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  cropName: string;
  onRegisterDisease: (result: DiseaseAnalysisResult, imageUri?: string) => void;
}

export const CameraScanModal: React.FC<Props> = ({
  isOpen,
  onClose,
  cropName,
  onRegisterDisease,
}) => {
  const { selectedLanguage } = useFarm();
  const [step, setStep] = useState<'capture' | 'analyzing' | 'result'>('capture');
  const [selectedImage, setSelectedImage] = useState<string>(
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCY-DB6DLLYHjzTuiWTiUTrmWWtM5BcdIs-ve8yyTH7agJi6hRPKOMn1_9kYaNX_pLCWiJ46Z4WS-GweBou4PrGCEPTOLMNw-piKleeazUb8Ct70cGaNqGWORK8GMzA3Wwn9InOPava82TNdiYdvvCv_wji8-6bI2pT2MdOaVTjEosgMZZZQihZ4oKXfGCUVf-mu8V2Tk1RVUU2viidRM3jk-1SClt6cxiHwhIoMNfI8hQg5c74oWj7'
  );
  const [analysisResult, setAnalysisResult] = useState<DiseaseAnalysisResult | null>(null);

  if (!isOpen) return null;

  const handleCaptureSubmit = async () => {
    setStep('analyzing');
    const result = await imageAnalysisService.analyzeCropImage(cropName, selectedImage);
    setAnalysisResult(result);
    setStep('result');
  };

  const handleRegister = () => {
    if (analysisResult) {
      onRegisterDisease(analysisResult, selectedImage);
      onClose();
      setStep('capture');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-background/85 backdrop-blur-md flex items-center justify-center p-margin-mobile">
      <div className="bg-surface-container border border-surface-variant w-full max-w-lg rounded-2xl p-md shadow-2xl overflow-y-auto max-h-[90vh] relative">
        <button
          onClick={() => {
            onClose();
            setStep('capture');
          }}
          className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface p-2 rounded-full hover:bg-surface-container-high"
        >
          <span className="material-symbols-outlined text-2xl">close</span>
        </button>

        <h3 className="font-headline-sm text-headline-sm text-on-surface mb-xs flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">photo_camera</span>
          {t('cropLeafScan', selectedLanguage)} ({translateCrop(cropName, selectedLanguage)})
        </h3>
        <p className="font-body-md text-on-surface-variant mb-md">
          {t('cropLeafScanDesc', selectedLanguage)}
        </p>

        {step === 'capture' && (
          <div className="space-y-md">
            <div className="relative w-full h-64 bg-surface-variant rounded-xl overflow-hidden border-2 border-dashed border-outline-variant flex flex-col items-center justify-center">
              <img src={selectedImage} alt="Crop Leaf Sample" className="w-full h-full object-cover opacity-90" />
              <div className="absolute inset-0 bg-background/30 flex items-center justify-center pointer-events-none">
                <div className="w-48 h-48 border-2 border-primary/80 rounded-lg flex items-center justify-center">
                  <span className="text-primary font-label-sm uppercase tracking-widest bg-background/80 px-2 py-1 rounded">
                    {t('alignLeaf', selectedLanguage)}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <label className="flex-1 bg-surface-variant hover:bg-surface-bright text-on-surface py-3 rounded-xl font-label-lg text-center cursor-pointer border border-outline-variant flex items-center justify-center gap-2">
                <span className="material-symbols-outlined">upload_file</span>
                {t('uploadPhoto', selectedLanguage)}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      const file = e.target.files[0];
                      setSelectedImage(URL.createObjectURL(file));
                    }
                  }}
                />
              </label>

              <button
                onClick={handleCaptureSubmit}
                className="flex-1 bg-primary hover:bg-primary-fixed text-on-primary py-3 rounded-xl font-label-lg font-bold flex items-center justify-center gap-2 shadow-md"
              >
                <span className="material-symbols-outlined">camera</span>
                {t('analyzePhoto', selectedLanguage)}
              </button>
            </div>
          </div>
        )}

        {step === 'analyzing' && (
          <div className="py-xl flex flex-col items-center justify-center text-center space-y-md">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="font-headline-sm text-on-surface">{t('analyzingSymptoms', selectedLanguage)}</p>
            <p className="font-body-md text-on-surface-variant">{t('scanningPatterns', selectedLanguage)}</p>
          </div>
        )}

        {step === 'result' && analysisResult && (
          <div className="space-y-md animate-in fade-in duration-300">
            <div className="bg-primary-container/40 border border-primary/30 p-md rounded-xl flex items-center justify-between">
              <div>
                <span className="font-label-sm text-primary uppercase tracking-widest">{t('diseaseDetected', selectedLanguage)}</span>
                <h4 className="font-headline-md text-headline-md text-primary-fixed">{translateText(analysisResult.diseaseName, selectedLanguage)}</h4>
              </div>
              <div className="bg-primary text-on-primary font-headline-sm px-3 py-1 rounded-lg">
                {analysisResult.confidencePercent}% <span className="text-xs">{t('match', selectedLanguage)}</span>
              </div>
            </div>

            <div className="space-y-sm">
              <div className="bg-surface-variant p-sm rounded-lg border border-outline-variant/30">
                <span className="font-label-sm text-on-surface-variant uppercase tracking-wider block mb-1">{t('symptoms', selectedLanguage)}</span>
                <p className="font-body-md text-on-surface">{analysisResult.symptoms}</p>
              </div>

              <div className="bg-surface-variant p-sm rounded-lg border border-outline-variant/30">
                <span className="font-label-sm text-on-surface-variant uppercase tracking-wider block mb-1">{t('likelyCause', selectedLanguage)}</span>
                <p className="font-body-md text-on-surface">{analysisResult.cause}</p>
              </div>

              <div className="bg-surface-variant p-sm rounded-lg border border-outline-variant/30">
                <span className="font-label-sm text-on-surface-variant uppercase tracking-wider block mb-1">{t('precaution', selectedLanguage)}</span>
                <p className="font-body-md text-on-surface">{analysisResult.precaution}</p>
              </div>

              <div className="bg-primary-container/30 p-sm rounded-lg border border-primary/30">
                <span className="font-label-sm text-primary uppercase tracking-wider block mb-1">{t('cure', selectedLanguage)}</span>
                <p className="font-body-md text-on-surface font-semibold">{analysisResult.cure}</p>
              </div>
            </div>

            <div className="flex gap-sm pt-sm border-t border-surface-variant">
              <button
                onClick={() => setStep('capture')}
                className="flex-1 bg-surface-variant text-on-surface py-3 rounded-xl font-label-lg"
              >
                {t('scanAnother', selectedLanguage)}
              </button>
              <button
                onClick={handleRegister}
                className="flex-1 bg-primary text-on-primary font-bold py-3 rounded-xl font-label-lg shadow-md hover:bg-primary-fixed"
              >
                {t('registerDisease', selectedLanguage)}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

