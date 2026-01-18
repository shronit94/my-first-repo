import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import useStore from '../../store/useStore';
import CozyCard from './CozyCard';
import '../../styles/theme.css';

const TemplateLibrary = () => {
  const addTasksFromTemplate = useStore((state) => state.addTasksFromTemplate);

  const templates = [
    {
      id: 1,
      title: "The 'I Haven't Showered in 3 Days' List",
      emoji: '🚿',
      description: 'Basic hygiene reset for when executive function has left the chat',
      tasks: [
        { title: 'Take a shower (even if it\'s just 2 minutes)', category: 'Hygiene', priority: 'high' },
        { title: 'Brush teeth', category: 'Hygiene', priority: 'high' },
        { title: 'Put on fresh clothes', category: 'Hygiene', priority: 'normal' },
        { title: 'Drink a full glass of water', category: 'Wellness', priority: 'normal' },
      ],
    },
    {
      id: 2,
      title: 'Kitchen Disaster Recovery',
      emoji: '🧼',
      description: 'For when the dishes have achieved sentience',
      tasks: [
        { title: 'Clear the absolute worst dishes into the sink', category: 'Home', priority: 'emergency' },
        { title: 'Run the dishwasher OR wash 5 dishes', category: 'Home', priority: 'high' },
        { title: 'Wipe down one counter', category: 'Home', priority: 'normal' },
        { title: 'Take out the trash', category: 'Home', priority: 'normal' },
      ],
    },
    {
      id: 3,
      title: 'Gentle Morning Routine',
      emoji: '☀️',
      description: 'Ease into your day without overwhelming yourself',
      tasks: [
        { title: 'Sit up in bed and take 3 deep breaths', category: 'Wellness', priority: 'normal' },
        { title: 'Drink water from bedside table', category: 'Wellness', priority: 'normal' },
        { title: 'Open curtains for natural light', category: 'Wellness', priority: 'low' },
        { title: 'Eat ANYTHING for breakfast', category: 'Wellness', priority: 'normal' },
      ],
    },
    {
      id: 4,
      title: 'Laundry Mountain Tackle',
      emoji: '👕',
      description: 'One step at a time toward clean clothes',
      tasks: [
        { title: 'Gather dirty clothes into one pile', category: 'Home', priority: 'high' },
        { title: 'Start ONE load of laundry', category: 'Home', priority: 'high' },
        { title: 'Set timer to move laundry to dryer', category: 'Home', priority: 'normal' },
        { title: 'Put away 5 clean items', category: 'Home', priority: 'low' },
      ],
    },
    {
      id: 5,
      title: 'Social Battery Recharge',
      emoji: '🔋',
      description: 'Low-effort ways to maintain connections',
      tasks: [
        { title: 'Reply to one text message', category: 'Social', priority: 'normal' },
        { title: 'Send a meme to a friend', category: 'Social', priority: 'low' },
        { title: 'Like some posts on social media', category: 'Social', priority: 'low' },
        { title: 'Schedule a call (don\'t have to do it today!)', category: 'Social', priority: 'low' },
      ],
    },
    {
      id: 6,
      title: 'Bedroom Rescue Mission',
      emoji: '🛏️',
      description: 'Create a cozy sanctuary for rest',
      tasks: [
        { title: 'Make the bed (or just pull up the covers)', category: 'Home', priority: 'normal' },
        { title: 'Put away 10 items from the floor', category: 'Home', priority: 'normal' },
        { title: 'Open window for fresh air', category: 'Home', priority: 'low' },
        { title: 'Fluff pillows and straighten sheets', category: 'Home', priority: 'low' },
      ],
    },
    {
      id: 7,
      title: 'Self-Care Sampler',
      emoji: '💆',
      description: 'Gentle acts of kindness for yourself',
      tasks: [
        { title: 'Do a 5-minute stretch or gentle movement', category: 'Wellness', priority: 'normal' },
        { title: 'Apply lotion or lip balm', category: 'Hygiene', priority: 'low' },
        { title: 'Listen to your favorite song', category: 'Wellness', priority: 'low' },
        { title: 'Say one nice thing about yourself', category: 'Wellness', priority: 'normal' },
      ],
    },
    {
      id: 8,
      title: 'Emergency Adulting Speedrun',
      emoji: '⚡',
      description: 'When you have 15 minutes before company arrives',
      tasks: [
        { title: 'Hide visible mess in one closet/room', category: 'Home', priority: 'emergency' },
        { title: 'Spray air freshener', category: 'Home', priority: 'emergency' },
        { title: 'Quick bathroom wipe-down', category: 'Home', priority: 'high' },
        { title: 'Put on "presentable" outfit', category: 'Hygiene', priority: 'high' },
      ],
    },
  ];

  const handleUseTemplate = (template) => {
    addTasksFromTemplate(template.tasks);
    // Optional: Show a success message or confetti
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ padding: '1.5rem', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{
          fontSize: '2rem',
          margin: '0 0 0.5rem 0',
          color: 'var(--color-charcoal)'
        }}>
          Adulting Templates
        </h2>
        <p style={{
          fontSize: '1rem',
          margin: 0,
          color: 'var(--color-charcoal)',
          opacity: 0.7
        }}>
          Pre-made quest lists for common adulting scenarios. Click to add all tasks to your list!
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '1.5rem'
      }}>
        {templates.map((template, index) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <CozyCard
              variant="sticker"
              onClick={() => handleUseTemplate(template)}
              style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              <div style={{
                fontSize: '3rem',
                marginBottom: '0.75rem',
                textAlign: 'center'
              }}>
                {template.emoji}
              </div>

              <h3 style={{
                fontSize: '1.2rem',
                margin: '0 0 0.5rem 0',
                color: 'var(--color-charcoal)',
                textAlign: 'center',
                lineHeight: '1.3'
              }}>
                {template.title}
              </h3>

              <p style={{
                fontSize: '0.9rem',
                margin: '0 0 1rem 0',
                color: 'var(--color-charcoal)',
                opacity: 0.7,
                textAlign: 'center',
                lineHeight: '1.5',
                flex: 1
              }}>
                {template.description}
              </p>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '0.75rem',
                borderRadius: '12px',
                background: 'var(--color-sandstone-dark)',
                marginTop: 'auto'
              }}>
                <Sparkles size={16} color="var(--color-sage-bright)" />
                <span style={{
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  color: 'var(--color-charcoal)'
                }}>
                  {template.tasks.length} quests
                </span>
              </div>
            </CozyCard>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        style={{
          marginTop: '2rem',
          textAlign: 'center'
        }}
      >
        <p style={{
          fontSize: '0.9rem',
          color: 'var(--color-charcoal)',
          opacity: 0.6,
          fontStyle: 'italic'
        }}>
          Remember: You don't have to do everything at once. Pick what feels manageable! 💚
        </p>
      </motion.div>
    </div>
  );
};

export default TemplateLibrary;
