import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Check, Droplet, Home, Heart, Users } from 'lucide-react';
import useStore from '../../store/useStore';
import CozyCard from './CozyCard';
import '../../styles/theme.css';

const QuestList = () => {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState('Wellness');
  const [newTaskPriority, setNewTaskPriority] = useState('normal');
  const [showAddForm, setShowAddForm] = useState(false);

  const getVisibleTasks = useStore((state) => state.getVisibleTasks);
  const addTask = useStore((state) => state.addTask);
  const toggleTask = useStore((state) => state.toggleTask);
  const deleteTask = useStore((state) => state.deleteTask);
  const clearCompleted = useStore((state) => state.clearCompleted);
  const lowSpoonMode = useStore((state) => state.lowSpoonMode);
  const allTasks = useStore((state) => state.tasks);

  const visibleTasks = getVisibleTasks();
  const completedTasks = allTasks.filter((task) => task.status === 'done');

  const categoryConfig = {
    Hygiene: { icon: Droplet, color: 'var(--color-sage-bright)', emoji: '🚿' },
    Home: { icon: Home, color: 'var(--color-terracotta-sunny)', emoji: '🏠' },
    Wellness: { icon: Heart, color: 'var(--color-sage-bright)', emoji: '💚' },
    Social: { icon: Users, color: 'var(--color-terracotta-sunny)', emoji: '🌸' },
  };

  const priorityLabels = {
    emergency: '🚨 Emergency',
    high: '⚡ High',
    normal: '📌 Normal',
    low: '🍃 Low',
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTaskTitle.trim()) {
      addTask({
        title: newTaskTitle,
        category: newTaskCategory,
        priority: newTaskPriority,
      });
      setNewTaskTitle('');
      setNewTaskPriority('normal');
      setShowAddForm(false);
    }
  };

  return (
    <div style={{ padding: '1.5rem', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1.5rem',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <h2 style={{
          fontSize: '2rem',
          margin: 0,
          color: 'var(--color-charcoal)'
        }}>
          Your Quests {lowSpoonMode && <span style={{ fontSize: '1rem', opacity: 0.6 }}>(Top 3)</span>}
        </h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAddForm(!showAddForm)}
          className="btn-primary"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <Plus size={20} />
          Add Quest
        </motion.button>
      </div>

      {/* Add Task Form */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <CozyCard style={{ marginBottom: '1.5rem' }}>
              <form onSubmit={handleAddTask}>
                <h3 style={{
                  fontSize: '1.2rem',
                  marginTop: 0,
                  marginBottom: '1rem',
                  color: 'var(--color-charcoal)'
                }}>
                  New Quest
                </h3>

                <input
                  type="text"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  placeholder="What needs doing?"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    marginBottom: '1rem',
                    borderRadius: '12px',
                    border: '2px solid var(--color-sandstone-dark)',
                    fontSize: '1rem',
                    fontFamily: 'var(--font-body)',
                    background: 'white',
                    color: 'var(--color-charcoal)',
                    boxSizing: 'border-box'
                  }}
                  autoFocus
                />

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '1rem',
                  marginBottom: '1rem'
                }}>
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      marginBottom: '0.5rem',
                      color: 'var(--color-charcoal)'
                    }}>
                      Category
                    </label>
                    <select
                      value={newTaskCategory}
                      onChange={(e) => setNewTaskCategory(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        borderRadius: '12px',
                        border: '2px solid var(--color-sandstone-dark)',
                        fontSize: '1rem',
                        fontFamily: 'var(--font-body)',
                        background: 'white',
                        color: 'var(--color-charcoal)',
                        cursor: 'pointer'
                      }}
                    >
                      {Object.keys(categoryConfig).map((cat) => (
                        <option key={cat} value={cat}>
                          {categoryConfig[cat].emoji} {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      marginBottom: '0.5rem',
                      color: 'var(--color-charcoal)'
                    }}>
                      Priority
                    </label>
                    <select
                      value={newTaskPriority}
                      onChange={(e) => setNewTaskPriority(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        borderRadius: '12px',
                        border: '2px solid var(--color-sandstone-dark)',
                        fontSize: '1rem',
                        fontFamily: 'var(--font-body)',
                        background: 'white',
                        color: 'var(--color-charcoal)',
                        cursor: 'pointer'
                      }}
                    >
                      {Object.entries(priorityLabels).map(([key, label]) => (
                        <option key={key} value={key}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  gap: '0.75rem'
                }}>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-primary"
                    style={{ flex: 1 }}
                  >
                    Add Quest
                  </motion.button>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowAddForm(false)}
                    className="btn-secondary"
                    style={{ flex: 1 }}
                  >
                    Cancel
                  </motion.button>
                </div>
              </form>
            </CozyCard>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quest Cards */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        <AnimatePresence>
          {visibleTasks.map((task, index) => {
            const config = categoryConfig[task.category] || categoryConfig.Wellness;
            const IconComponent = config.icon;

            return (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.1 }}
              >
                <CozyCard
                  variant={task.priority === 'emergency' ? 'emergency' : 'sticker'}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '1.5rem'
                  }}
                >
                  <IconComponent size={32} color={config.color} />

                  <div style={{ flex: 1 }}>
                    <p style={{
                      margin: 0,
                      fontSize: '1.1rem',
                      fontWeight: '500',
                      color: 'var(--color-charcoal)'
                    }}>
                      {task.title}
                    </p>
                    <div style={{
                      display: 'flex',
                      gap: '0.5rem',
                      marginTop: '0.5rem',
                      flexWrap: 'wrap'
                    }}>
                      <span style={{
                        fontSize: '0.8rem',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '8px',
                        background: 'var(--color-sandstone-dark)',
                        color: 'var(--color-charcoal)',
                        fontWeight: '600'
                      }}>
                        {config.emoji} {task.category}
                      </span>
                      {task.priority !== 'normal' && (
                        <span style={{
                          fontSize: '0.8rem',
                          padding: '0.25rem 0.75rem',
                          borderRadius: '8px',
                          background: task.priority === 'emergency'
                            ? 'var(--color-terracotta-glow)'
                            : 'var(--color-sandstone-dark)',
                          color: 'var(--color-charcoal)',
                          fontWeight: '600'
                        }}>
                          {priorityLabels[task.priority]}
                        </span>
                      )}
                    </div>
                  </div>

                  <div style={{
                    display: 'flex',
                    gap: '0.5rem'
                  }}>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => toggleTask(task.id)}
                      style={{
                        padding: '0.75rem',
                        borderRadius: '12px',
                        border: 'none',
                        background: 'var(--color-sage-bright)',
                        color: 'white',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Check size={20} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => deleteTask(task.id)}
                      style={{
                        padding: '0.75rem',
                        borderRadius: '12px',
                        border: 'none',
                        background: 'var(--color-terracotta-sunny)',
                        color: 'white',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Trash2 size={20} />
                    </motion.button>
                  </div>
                </CozyCard>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {visibleTasks.length === 0 && (
          <CozyCard style={{ textAlign: 'center', padding: '3rem 2rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✨</div>
            <p style={{
              fontSize: '1.1rem',
              margin: 0,
              color: 'var(--color-charcoal)',
              opacity: 0.7
            }}>
              No quests yet. Add one to get started!
            </p>
          </CozyCard>
        )}
      </div>

      {/* Completed Tasks Section */}
      {completedTasks.length > 0 && (
        <div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1rem'
          }}>
            <h3 style={{
              fontSize: '1.5rem',
              margin: 0,
              color: 'var(--color-charcoal)'
            }}>
              Completed 🎉
            </h3>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={clearCompleted}
              className="btn-secondary"
              style={{
                fontSize: '0.9rem',
                padding: '0.5rem 1rem'
              }}
            >
              Clear All
            </motion.button>
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem'
          }}>
            {completedTasks.map((task) => {
              const config = categoryConfig[task.category] || categoryConfig.Wellness;

              return (
                <CozyCard
                  key={task.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '1rem',
                    opacity: 0.6
                  }}
                >
                  <Check size={24} color="var(--color-sage-bright)" />
                  <p style={{
                    flex: 1,
                    margin: 0,
                    fontSize: '1rem',
                    color: 'var(--color-charcoal)',
                    textDecoration: 'line-through'
                  }}>
                    {task.title}
                  </p>
                  <span style={{ fontSize: '1.5rem' }}>
                    {config.emoji}
                  </span>
                </CozyCard>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestList;
