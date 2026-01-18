import { BookOpen, Sparkles } from 'lucide-react';
import { useState } from 'react';
import useStore from '../store/useStore';
import CozyCard from './CozyCard';

const templates = [
  {
    id: 1,
    name: "The 'I haven't showered in 3 days' List",
    icon: '🚿',
    description: 'Essential hygiene reset',
    tasks: [
      { title: 'Take a shower', category: 'Hygiene', priority: 1 },
      { title: 'Brush teeth', category: 'Hygiene', priority: 1 },
      { title: 'Put on clean clothes', category: 'Hygiene', priority: 2 },
      { title: 'Wash face', category: 'Hygiene', priority: 2 },
    ],
  },
  {
    id: 2,
    name: 'Kitchen Disaster Recovery',
    icon: '🍽️',
    description: 'Tackle the kitchen chaos',
    tasks: [
      { title: 'Wash the dishes', category: 'Home', priority: 1 },
      { title: 'Wipe down counters', category: 'Home', priority: 2 },
      { title: 'Take out trash', category: 'Home', priority: 1 },
      { title: 'Clear the sink', category: 'Home', priority: 1 },
    ],
  },
  {
    id: 3,
    name: 'Bare Minimum Self-Care',
    icon: '💚',
    description: 'The gentlest start',
    tasks: [
      { title: 'Drink a glass of water', category: 'Wellness', priority: 1 },
      { title: 'Eat something (anything!)', category: 'Wellness', priority: 1 },
      { title: 'Take your meds', category: 'Wellness', priority: 1 },
      { title: 'Open the curtains', category: 'Home', priority: 2 },
    ],
  },
  {
    id: 4,
    name: 'Depression-Proof Morning',
    icon: '🌅',
    description: 'Low-energy morning routine',
    tasks: [
      { title: 'Get out of bed', category: 'Wellness', priority: 1 },
      { title: 'Drink water', category: 'Wellness', priority: 1 },
      { title: 'Splash water on face', category: 'Hygiene', priority: 2 },
      { title: 'Put on different clothes', category: 'Hygiene', priority: 3 },
    ],
  },
  {
    id: 5,
    name: 'Social Battery Recharge',
    icon: '👋',
    description: 'Gentle social reconnection',
    tasks: [
      { title: 'Text one friend back', category: 'Social', priority: 2 },
      { title: 'Like a friend\'s post', category: 'Social', priority: 3 },
      { title: 'Send a meme to someone', category: 'Social', priority: 3 },
    ],
  },
  {
    id: 6,
    name: 'Laundry Mountain Assault',
    icon: '👕',
    description: 'Conquer the clothing pile',
    tasks: [
      { title: 'Sort dirty laundry', category: 'Home', priority: 2 },
      { title: 'Start one load of laundry', category: 'Home', priority: 1 },
      { title: 'Move laundry to dryer', category: 'Home', priority: 2 },
      { title: 'Fold clean clothes', category: 'Home', priority: 3 },
    ],
  },
];

const AdultingTemplates = () => {
  const addTasksFromTemplate = useStore((state) => state.addTasksFromTemplate);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showTemplates, setShowTemplates] = useState(false);

  const handleApplyTemplate = (template) => {
    addTasksFromTemplate(template.tasks);
    setSelectedTemplate(template);
    setTimeout(() => {
      setSelectedTemplate(null);
      setShowTemplates(false);
    }, 2000);
  };

  return (
    <div style={{ marginBottom: '2rem' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem',
      }}>
        <h2 style={{ margin: 0, fontSize: '1.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <BookOpen size={28} color="var(--color-sage-bright)" />
          Template Library
        </h2>
        <button
          className="btn btn-primary"
          onClick={() => setShowTemplates(!showTemplates)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            fontSize: '0.9rem',
          }}
        >
          <Sparkles size={18} />
          {showTemplates ? 'Hide Templates' : 'Browse Templates'}
        </button>
      </div>

      <p style={{
        fontSize: '0.9rem',
        color: 'var(--color-charcoal)',
        opacity: 0.7,
        marginBottom: '1.5rem',
      }}>
        Pre-made quest lists for common adulting scenarios. Click to add all tasks at once!
      </p>

      {showTemplates && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1rem',
        }}>
          {templates.map((template) => (
            <CozyCard
              key={template.id}
              variant="sticker"
              onClick={() => handleApplyTemplate(template)}
              style={{
                cursor: 'pointer',
                position: 'relative',
              }}
            >
              {selectedTemplate?.id === template.id && (
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: 'var(--color-sage-bright)',
                  color: 'white',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '12px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                }}>
                  Added! ✓
                </div>
              )}

              <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>
                {template.icon}
              </div>

              <h3 style={{
                margin: '0 0 0.5rem 0',
                fontSize: '1.1rem',
                color: 'var(--color-charcoal)',
              }}>
                {template.name}
              </h3>

              <p style={{
                margin: '0 0 1rem 0',
                fontSize: '0.85rem',
                opacity: 0.7,
              }}>
                {template.description}
              </p>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.8rem',
                color: 'var(--color-sage-bright)',
                fontWeight: 600,
              }}>
                <Sparkles size={14} />
                {template.tasks.length} quests
              </div>
            </CozyCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdultingTemplates;
