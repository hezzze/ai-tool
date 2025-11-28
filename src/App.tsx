import { useState } from 'react';
import { Layout } from './components/Layout';
import { CreateImage } from './pages/CreateImage';
import { DescribeImage } from './pages/DescribeImage';
import { LanguageProvider } from './contexts/LanguageContext';

function App() {
  const [activeView, setActiveView] = useState<'create' | 'describe'>('create');

  return (
    <LanguageProvider>
      <Layout activeView={activeView} onNavigate={setActiveView}>
        {activeView === 'create' ? <CreateImage /> : <DescribeImage />}
      </Layout>
    </LanguageProvider>
  );
}

export default App;
