// We're using React, which is a popular tool for building user interfaces
import React, { useState } from 'react';

// This is where we define how our app will look
// Think of this as a set of instructions for the app's appearance
const styles = {
  // The main container for our entire app
  app: {
    fontFamily: 'Arial, sans-serif', // The type of font we're using
    maxWidth: '600px', // The app won't be wider than 600 pixels
    margin: '0 auto', // This centers the app on the page
    padding: '20px', // This adds some space inside the app's borders
    backgroundColor: '#f0f4f8', // A light blue background color
    borderRadius: '10px', // This makes the corners of our app rounded
    boxShadow: '0 0 10px rgba(0,0,0,0.1)', // This adds a subtle shadow around the app
  },
  // Styles for the main title of our app
  header: {
    color: '#2c3e50', // The color of the text
    textAlign: 'center', // This centers the text
    marginBottom: '20px', // This adds some space below the title
  },
  // Styles for the container that holds our input field and add button
  inputContainer: {
    display: 'flex', // This makes the input and button sit side by side
    marginBottom: '20px', // This adds some space below this container
  },
  // Styles for the input field where users type new tasks
  input: {
    flex: 1, // This makes the input field take up all available space
    padding: '10px', // This adds some space inside the input field
    fontSize: '16px', // This sets the size of the text inside the input
    border: '1px solid #bdc3c7', // This adds a border around the input
    borderRadius: '5px 0 0 5px', // This rounds the left corners of the input
  },
  // Styles for all the buttons in our app
  button: {
    padding: '10px 20px', // This adds space inside the button
    fontSize: '16px', // This sets the size of the text on the button
    backgroundColor: '#3498db', // This sets the button's background color to blue
    color: 'white', // This sets the text color to white
    border: 'none', // This removes the default border
    borderRadius: '0 5px 5px 0', // This rounds the right corners of the button
    cursor: 'pointer', // This changes the cursor to a hand when hovering over the button
    transition: 'background-color 0.3s', // This makes the color change smooth when hovering
  },
  // Styles for the list that will contain all of our tasks
  list: {
    listStyleType: 'none', // This removes the default bullet points
    padding: 0, // This removes the default padding
  },
  // Styles for each item in our task list
  listItem: {
    backgroundColor: 'white', // This sets the background of each task to white
    marginBottom: '10px', // This adds some space between tasks
    padding: '10px', // This adds some space inside each task item
    borderRadius: '5px', // This rounds the corners of each task item
    display: 'flex', // This allows us to position the task text and buttons side by side
    alignItems: 'center', // This vertically centers the content of each task
    justifyContent: 'space-between', // This pushes the task text and buttons to opposite ends
  },
  // Styles for the text of each task
  taskText: {
    flex: 1, // This makes the task text take up all available space
  },
  // Styles for the input field when editing a task
  editInput: {
    flex: 1, // This makes the edit input take up all available space
    padding: '5px', // This adds some space inside the input
    fontSize: '16px', // This sets the size of the text
    border: '1px solid #bdc3c7', // This adds a border around the input
    borderRadius: '5px', // This rounds the corners of the input
    marginRight: '10px', // This adds some space to the right of the input
  },
  // Styles for the action buttons (Edit, Delete, Save)
  actionButton: {
    padding: '5px 10px', // This adds some space inside the button
    fontSize: '14px', // This sets the size of the text on the button
    marginLeft: '5px', // This adds some space to the left of the button
    border: 'none', // This removes the default border
    borderRadius: '3px', // This rounds the corners of the button
    cursor: 'pointer', // This changes the cursor to a hand when hovering
    transition: 'background-color 0.3s', // This makes the color change smooth when hovering
  },
};

// This is our main App component, which contains all the logic for our Task Manager
function App() {
  // These are special variables that can change over time (we call them "state")
  // When they change, React automatically updates our app to show the new information
  
  // This keeps track of all our tasks
  const [tasks, setTasks] = useState([]);
  // This keeps track of what the user is typing in the "new task" input
  const [newTask, setNewTask] = useState('');
  // This keeps track of which task (if any) is currently being edited
  const [editingId, setEditingId] = useState(null);
  // This keeps track of what the user is typing when editing a task
  const [editingText, setEditingText] = useState('');

  // This function adds a new task to our list
  const addTask = () => {
    // We only add the task if it's not empty
    if (newTask.trim() !== '') {
      // We add the new task to our list of tasks
      // Each task is an object with an id (to keep track of it) and the task text
      setTasks([...tasks, { id: Date.now(), text: newTask }]);
      // We clear the input field after adding the task
      setNewTask('');
    }
  };

  // This function is called when we want to start editing a task
  const startEditing = (id, text) => {
    // We set which task is being edited
    setEditingId(id);
    // We put the current task text into the edit input
    setEditingText(text);
  };

  // This function is called when we're done editing a task and want to save the changes
  const saveEdit = () => {
    // We update our list of tasks
    // If the task's id matches the one we're editing, we update its text
    // Otherwise, we leave the task as it is
    setTasks(tasks.map(task => 
      task.id === editingId ? { ...task, text: editingText } : task
    ));
    // We're done editing, so we clear the editing id
    setEditingId(null);
  };

  // This function deletes a task from our list
  const deleteTask = (id) => {
    // We create a new list of tasks that doesn't include the task we want to delete
    setTasks(tasks.filter(task => task.id !== id));
  };

  // This is what our app will look like
  return (
    <div style={styles.app}>
      <h1 style={styles.header}>Task Manager</h1>
      
      {/* This is where users can input new tasks */}
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

      {/* This is our list of tasks */}
      <ul style={styles.list}>
        {/* We go through each task and create a list item for it */}
        {tasks.map(task => (
          <li key={task.id} style={styles.listItem}>
            {/* If we're currently editing this task, we show an input field */}
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
              /* If we're not editing this task, we show the task text and action buttons */
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

// This line makes our App available to other parts of our program
export default App;