import React from 'react';
import { FarmProvider, useFarm } from './context/FarmContext';
import { Navigation } from './components/Navigation';
import { LoginScreen } from './components/LoginScreen';
import { FieldSetupScreen } from './components/FieldSetupScreen';
import { DashboardScreen } from './components/DashboardScreen';
import { DiseaseWeedScreen } from './components/DiseaseWeedScreen';
import { AIAssistantScreen } from './components/AIAssistantScreen';
import { AnalyticsMarketScreen } from './components/AnalyticsMarketScreen';

const MainContainer: React.FC = () => {
  const { currentScreen } = useFarm();

  const renderScreen = () => {
    switch (currentScreen) {
      case 'login':
        return <LoginScreen />;
      case 'field-setup':
        return <FieldSetupScreen />;
      case 'dashboard':
        return <DashboardScreen />;
      case 'disease-weed':
        return <DiseaseWeedScreen />;
      case 'assistant':
        return <AIAssistantScreen />;
      case 'analytics':
        return <AnalyticsMarketScreen />;
      default:
        return <DashboardScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-on-surface md:pl-80">
      {renderScreen()}
      <Navigation />
    </div>
  );
};

export function App() {
  return (
    <FarmProvider>
      <MainContainer />
    </FarmProvider>
  );
}

export default App;
