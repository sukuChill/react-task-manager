import React, { useState } from 'react';

const styles = {
  app: {
    fontFamily: 'Arial, sans-serif',
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f0f4f8',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  },
  header: {
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: '20px',
  },
  inputContainer: {
    display: 'flex',
    marginBottom: '20px',
  },
  input: {
    flex: 1,
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #bdc3c7',
    borderRadius: '5px 0 0 5px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '0 5px 5px 0',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
  },
  listItem: {
    backgroundColor: 'white',
    marginBottom: '10px',
    padding: '10px',
    borderRadius: '5px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  taskText: {
    flex: 1,
  },
  editInput: {
    flex: 1,
    padding: '5px',
    fontSize: '16px',
    border: '1px solid #bdc3c7',
    borderRadius: '5px',
    marginRight: '10px',
  },
  actionButton: {
    padding: '5px 10px',
    fontSize: '14px',
    marginLeft: '5px',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: newTask }]);
      setNewTask('');
    }
  };

  const startEditing = (id, text) => {
    setEditingId(id);
    setEditingText(text);
  };

  const saveEdit = () => {
    setTasks(tasks.map(task => 
      task.id === editingId ? { ...task, text: editingText } : task
    ));
    setEditingId(null);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div style={styles.app}>
      <h1 style={styles.header}>Task Manager</h1>
      
      <div style={styles.inputContainer}>
        <input 
          style={styles.input}
          type="text" 
          value={newTask} 
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter a new task"
        />
        <button style={styles.button} onClick={addTask}>Add Task</button>
      </div>

      <ul style={styles.list}>
        {tasks.map(task => (
          <li key={task.id} style={styles.listItem}>
            {editingId === task.id ? (
              <>
                <input 
                  style={styles.editInput}
                  type="text" 
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                />
                <button 
                  style={{...styles.actionButton, backgroundColor: '#2ecc71'}} 
                  onClick={saveEdit}
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <span style={styles.taskText}>{task.text}</span>
                <div>
                  <button 
                    style={{...styles.actionButton, backgroundColor: '#f39c12'}} 
                    onClick={() => startEditing(task.id, task.text)}
                  >
                    Edit
                  </button>
                  <button 
                    style={{...styles.actionButton, backgroundColor: '#e74c3c'}} 
                    onClick={() => deleteTask(task.id)}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;