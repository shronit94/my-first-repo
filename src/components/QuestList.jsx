import { CheckCircle2, Circle, Trash2, Plus } from 'lucide-react';
import { useState } from 'react';
import useStore from '../store/useStore';
import CozyCard from './CozyCard';

const QuestList = () => {
  const getVisibleTasks = useStore((state) => state.getVisibleTasks);
  const toggleTask = useStore((state) => state.toggleTask);
  const deleteTask = useStore((state) => state.deleteTask);
  const addTask = useStore((state) => state.addTask);
  const lowSpoonMode = useStore((state) => state.lowSpoonMode);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState('Wellness');

  const visibleTasks = getVisibleTasks();

  const getCategoryIcon = (category) => {
    const icons = {
      Hygiene: '🚿',
      Home: '🏠',
      Wellness: '💚',
      Social: '👋',
    };
    return icons[category] || '✨';
  };

  const getCategoryColor = (category) => {
    const colors = {
      Hygiene: '#8DAA91',
      Home: '#D98B74',
      Wellness: '#8DAA91',
      Social: '#D98B74',
    };
    return colors[category] || '#8DAA91';
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTaskTitle.trim()) {
      addTask({
        title: newTaskTitle,
        category: newTaskCategory,
        priority: 3,
      });
      setNewTaskTitle('');
      setShowAddForm(false);
    }
  };

  return (
    <div style={{ marginBottom: '2rem' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem',
      }}>
        <h2 style={{ margin: 0, fontSize: '1.75rem' }}>
          {lowSpoonMode ? 'Top 3 Quests 🎯' : 'Your Quests ✨'}
        </h2>
        <button
          className="btn btn-secondary"
          onClick={() => setShowAddForm(!showAddForm)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            fontSize: '0.9rem',
          }}
        >
          <Plus size={18} />
          Add Quest
        </button>
      </div>

      {lowSpoonMode && (
        <p style={{
          fontSize: '0.9rem',
          color: 'var(--color-charcoal)',
          opacity: 0.7,
          marginBottom: '1rem',
        }}>
          Low Spoon Mode is active. Showing your top 3 critical tasks.
        </p>
      )}

      {/* Add Task Form */}
      {showAddForm && (
        <CozyCard className="add-task-form" style={{ marginBottom: '1rem' }}>
          <form onSubmit={handleAddTask}>
            <h3 style={{ marginTop: 0, fontSize: '1.25rem' }}>Add New Quest</h3>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: 600,
                fontSize: '0.9rem',
              }}>
                Quest Title
              </label>
              <input
                type="text"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder="What needs to be done?"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '12px',
                  border: '2px solid var(--color-sandstone-dark)',
                  fontSize: '1rem',
                  fontFamily: 'var(--font-body)',
                }}
                autoFocus
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: 600,
                fontSize: '0.9rem',
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
                  cursor: 'pointer',
                }}
              >
                <option value="Wellness">💚 Wellness</option>
                <option value="Hygiene">🚿 Hygiene</option>
                <option value="Home">🏠 Home</option>
                <option value="Social">👋 Social</option>
              </select>
            </div>
            <div style={{
              display: 'flex',
              gap: '0.75rem',
            }}>
              <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                Add Quest
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="btn"
                style={{
                  flex: 1,
                  background: 'var(--color-sandstone-dark)',
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </CozyCard>
      )}

      {/* Quest List */}
      {visibleTasks.length === 0 ? (
        <CozyCard>
          <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
            <p style={{ fontSize: '3rem', margin: '0 0 1rem 0' }}>🎉</p>
            <h3 style={{ margin: '0 0 0.5rem 0' }}>All Done!</h3>
            <p style={{ margin: 0, opacity: 0.7 }}>
              You've completed all your quests. Time to rest!
            </p>
          </div>
        </CozyCard>
      ) : (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}>
          {visibleTasks.map((task, index) => (
            <CozyCard
              key={task.id}
              variant="sticker"
              className="quest-item"
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
              }}>
                <button
                  onClick={() => toggleTask(task.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  {task.status === 'done' ? (
                    <CheckCircle2
                      size={28}
                      color="var(--color-sage-bright)"
                      fill="var(--color-sage-bright)"
                    />
                  ) : (
                    <Circle size={28} color="var(--color-charcoal)" opacity={0.3} />
                  )}
                </button>

                <div style={{ flex: 1 }}>
                  <p style={{
                    margin: 0,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    textDecoration: task.status === 'done' ? 'line-through' : 'none',
                    opacity: task.status === 'done' ? 0.5 : 1,
                  }}>
                    {getCategoryIcon(task.category)} {task.title}
                  </p>
                  <div style={{
                    display: 'inline-block',
                    marginTop: '0.5rem',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '12px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    background: getCategoryColor(task.category) + '20',
                    color: getCategoryColor(task.category),
                  }}>
                    {task.category}
                  </div>
                </div>

                <button
                  onClick={() => deleteTask(task.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '0.5rem',
                    opacity: 0.5,
                    transition: 'opacity 0.2s',
                  }}
                  onMouseEnter={(e) => e.target.style.opacity = 1}
                  onMouseLeave={(e) => e.target.style.opacity = 0.5}
                >
                  <Trash2 size={20} color="var(--color-terracotta-sunny)" />
                </button>
              </div>
            </CozyCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuestList;
