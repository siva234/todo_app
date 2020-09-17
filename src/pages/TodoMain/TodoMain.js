import React, { useState, useEffect } from 'react';
import styles from './TodoMain.module.css';

import { Button, FormControl, Input, InputLabel } from '@material-ui/core';
import Todo from '../../components/Todo';
import db from '../../firebase';
import firebase from "firebase";

function TodoMain() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot =>{
      setTodos(snapshot.docs.map(doc => ({id: doc.id, todo: doc.data().todo})))
    })
  }, []);

  const addTodo = (event) => {
    event.preventDefault();
    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    setInput('');
  }

  return (
    <div className={styles.todoMain}>
      <h1>ToDo List</h1>
      <form className={styles.formm}>
        <FormControl>
          <InputLabel>Write a Todo:</InputLabel>
          <Input value={input} onChange={event => setInput(event.target.value)} />
        </FormControl>
        <Button disabled={!input} type="submit" onClick={addTodo} variant="contained" color="primary">
          Add Todo
        </Button>
      </form>

      <ul className={styles.todoList}>
        {todos.map(todo => (
          <Todo todo={todo}/>
        ))}
      </ul>

    </div>
  );
}

export default TodoMain;
