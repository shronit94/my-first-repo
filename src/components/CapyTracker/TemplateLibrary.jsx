import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X } from 'lucide-react';
import useStore from '../../store/useStore';
import CozyCard from './CozyCard';
import '../../styles/theme.css';

const TemplateLibrary = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const addTasksFromTemplate = useStore((state) => state.addTasksFromTemplate);

  const templates = [
    {
      id: 1,
      title: '🍽️ Kitchen Recovery',
      emoji: '🍽️',
      description: 'Get your kitchen back to functional without overwhelm',
      tasks: [
        { title: '🧼 Clear the sink', category: 'Home', energyCost: 2, priority: 'normal' },
        { title: '🗑️ Take out the trash', category: 'Home', energyCost: 1, priority: 'normal' },
        { title: '✨ Wipe down one counter', category: 'Home', energyCost: 1, priority: 'normal' },
        { title: '🧽 Wash dishes for next meal', category: 'Home', energyCost: 2, priority: 'normal' },
        { title: '💧 Fill up a water bottle or pitcher', category: 'Wellness', energyCost: 1, priority: 'normal' },
      ],
    },
    {
      id: 2,
      title: '☀️ Morning Routine',
      emoji: '☀️',
      description: 'Ease into your day with gentle, grounding steps',
      tasks: [
        { title: '📵 No phone for 15 minutes', category: 'Wellness', energyCost: 2, priority: 'normal' },
        { title: '🚿 Quick shower or face rinse', category: 'Wellness', energyCost: 2, priority: 'normal' },
        { title: '☕ Make your favorite morning beverage', category: 'Wellness', energyCost: 1, priority: 'normal' },
        { title: '🎵 Put on mood-lifting music', category: 'Wellness', energyCost: 1, priority: 'normal' },
        { title: '📝 Write down one thing you\'re grateful for', category: 'Wellness', energyCost: 1, priority: 'normal' },
      ],
    },
    {
      id: 3,
      title: '👕 Laundry Tackle',
      emoji: '👕',
      description: 'One step at a time toward clean clothes',
      tasks: [
        { title: '🧺 Gather dirty clothes into one pile', category: 'Home', energyCost: 2, priority: 'high' },
        { title: '🔄 Start one load of laundry', category: 'Home', energyCost: 2, priority: 'high' },
        { title: '👔 Put away clean items (just 5 minutes)', category: 'Home', energyCost: 2, priority: 'normal' },
        { title: '🧦 Match socks while watching something', category: 'Home', energyCost: 1, priority: 'low' },
      ],
    },
    {
      id: 4,
      title: '💬 Social Recharge',
      emoji: '💬',
      description: 'Low-effort ways to stay connected',
      tasks: [
        { title: '📱 Send a quick message to someone', category: 'Social', energyCost: 1, priority: 'normal' },
        { title: '🎧 Spend 15 minutes doing something you enjoy alone', category: 'Wellness', energyCost: 1, priority: 'normal' },
        { title: '☕ Have a low-pressure interaction (coffee chat, quick call)', category: 'Social', energyCost: 2, priority: 'low' },
      ],
    },
    {
      id: 5,
      title: '🛏️ Bedroom Rescue',
      emoji: '🛏️',
      description: 'Create a cozy sanctuary for rest',
      tasks: [
        { title: '🛏️ Change your sheets', category: 'Home', energyCost: 3, priority: 'normal' },
        { title: '👕 Pick up clothes from the floor', category: 'Home', energyCost: 2, priority: 'normal' },
        { title: '🗑️ Clear trash and dishes from your room', category: 'Home', energyCost: 1, priority: 'normal' },
        { title: '✨ Wipe down your nightstand', category: 'Home', energyCost: 1, priority: 'low' },
        { title: '🪟 Open window to air out the room', category: 'Wellness', energyCost: 1, priority: 'low' },
      ],
    },
    {
      id: 6,
      title: '🧖 Self-Care Sampler',
      emoji: '🧖',
      description: 'Gentle acts of care for yourself',
      tasks: [
        { title: '🚿 Take a shower or wash your face', category: 'Wellness', energyCost: 2, priority: 'normal' },
        { title: '🪥 Brush your teeth and floss', category: 'Wellness', energyCost: 1, priority: 'normal' },
        { title: '💅 Trim nails or do light grooming', category: 'Wellness', energyCost: 1, priority: 'low' },
        { title: '🧴 Apply lotion or moisturizer', category: 'Wellness', energyCost: 1, priority: 'low' },
        { title: '🛌 Lay out clothes for tomorrow', category: 'Wellness', energyCost: 1, priority: 'low' },
      ],
    },
    {
      id: 7,
      title: '⚡ Emergency Speedrun',
      emoji: '⚡',
      description: 'Quick wins when time or energy is tight',
      tasks: [
        { title: '📧 Respond to one important email or message', category: 'Social', energyCost: 2, priority: 'high' },
        { title: '💳 Pay one bill that\'s been nagging you', category: 'Home', energyCost: 2, priority: 'high' },
        { title: '📅 Schedule one appointment you\'ve been avoiding', category: 'Wellness', energyCost: 2, priority: 'normal' },
        { title: '📞 Make the call you\'ve been putting off', category: 'Social', energyCost: 3, priority: 'normal' },
        { title: '📝 Write down your top 3 priorities for tomorrow', category: 'Wellness', energyCost: 1, priority: 'normal' },
      ],
    },
  ];

  const handleUseTemplate = (template) => {
    addTasksFromTemplate(template.tasks);
    setSelectedTemplate(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const energyCostLabels = {
    1: '🌿',
    2: '🍃',
    3: '✨',
  };

  return (
    <div style={{ padding: '1.5rem', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{
          fontSize: '2rem',
          margin: '0 0 0.5rem 0',
          color: 'var(--color-charcoal)'
        }}>
          Quest Bundles
        </h2>
        <p style={{
          fontSize: '1rem',
          margin: 0,
          color: 'var(--color-charcoal)',
          opacity: 0.7
        }}>
          Pre-made quest collections for common situations. Click to preview and add!
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
              onClick={() => setSelectedTemplate(template)}
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

      {/* Preview Modal */}
      <AnimatePresence>
        {selectedTemplate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedTemplate(null)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.5)',
              backdropFilter: 'blur(4px)',
              zIndex: 1000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1rem'
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: 'var(--color-sandstone-light)',
                borderRadius: 'var(--radius-sticker)',
                padding: '2rem',
                maxWidth: '600px',
                width: '100%',
                maxHeight: '80vh',
                overflowY: 'auto',
                position: 'relative',
                border: '3px solid var(--color-sage-bright)',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
              }}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedTemplate(null)}
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: 'var(--color-sandstone-dark)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                <X size={20} color="var(--color-charcoal)" />
              </button>

              {/* Template Header */}
              <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '4rem', marginBottom: '0.5rem' }}>
                  {selectedTemplate.emoji}
                </div>
                <h2 style={{
                  fontSize: '1.8rem',
                  margin: '0 0 0.5rem 0',
                  color: 'var(--color-charcoal)'
                }}>
                  {selectedTemplate.title}
                </h2>
                <p style={{
                  fontSize: '1rem',
                  margin: 0,
                  color: 'var(--color-charcoal)',
                  opacity: 0.7
                }}>
                  {selectedTemplate.description}
                </p>
              </div>

              {/* Task Preview List */}
              <div style={{
                marginBottom: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem'
              }}>
                <h3 style={{
                  fontSize: '1.1rem',
                  margin: '0 0 0.75rem 0',
                  color: 'var(--color-charcoal)'
                }}>
                  What's included:
                </h3>
                {selectedTemplate.tasks.map((task, index) => (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.75rem 1rem',
                      background: 'white',
                      borderRadius: '12px',
                      border: '2px solid var(--color-sandstone-dark)'
                    }}
                  >
                    <span style={{
                      fontSize: '1.2rem',
                      minWidth: '24px',
                      textAlign: 'center'
                    }}>
                      {energyCostLabels[task.energyCost]}
                    </span>
                    <span style={{
                      flex: 1,
                      fontSize: '0.95rem',
                      color: 'var(--color-charcoal)',
                      fontWeight: '500'
                    }}>
                      {task.title}
                    </span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div style={{
                display: 'flex',
                gap: '0.75rem'
              }}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleUseTemplate(selectedTemplate)}
                  className="btn-primary"
                  style={{
                    flex: 1,
                    padding: '1rem'
                  }}
                >
                  Add to My Quests
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedTemplate(null)}
                  className="btn-secondary"
                  style={{
                    flex: 1,
                    padding: '1rem'
                  }}
                >
                  Maybe Later
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
