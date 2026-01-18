import Dashboard from './components/Dashboard';
import QuestList from './components/QuestList';
import AdultingTemplates from './components/AdultingTemplates';
import CapybaraCompanion from './components/CapybaraCompanion';

function App() {
  return (
    <div className="container">
      {/* Main Content */}
      <main>
        {/* Dashboard with Today's One Thing and Low Spoon Mode Toggle */}
        <Dashboard />

        {/* Adulting Templates Library */}
        <AdultingTemplates />

        {/* Quest List */}
        <QuestList />
      </main>

      {/* Capybara Companion - Fixed position in corner */}
      <CapybaraCompanion />

      {/* Footer */}
      <footer style={{
        textAlign: 'center',
        padding: '2rem 0',
        marginTop: '4rem',
        color: 'var(--color-charcoal)',
        opacity: 0.5,
        fontSize: '0.85rem',
      }}>
        <p style={{ margin: 0 }}>
          CapyTracker - Making adulting a little less hard 🌿
        </p>
      </footer>
    </div>
  );
}

export default App;
