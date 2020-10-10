import React, { useState, useEffect } from 'react'
import styles from './Todo.module.css';

import { db, auth } from '../../firebase';
import firebase from "firebase";
import { Delete, Edit } from '@material-ui/icons';
import { Button, List, ListItem, ListItemAvatar, ListItemText, Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

function Todo({todo, user}) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState('');

    const updateTodo = () => {
        db.collection('todos').doc(todo.id).set({
            text: input,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }, {merge: true })
        setOpen(false);
    }

    return (
        <>
        <Modal
            open={open}
            onClose={e=> setOpen(false)}
        >
            <div className={classes.paper}>
                <h1>Edit window</h1>
                <input placeholder={todo.todos.text} value={input} onChange={event => setInput(event.target.value)} />
                <Button disabled={!input } onClick={updateTodo} variant="contained" color="primary">Update ToDo</Button>
            </div>
        </Modal>
        <List className={styles.todoListItem}>
            <ListItem className={styles.todoListItemContent}>
                <ListItemAvatar>
                </ListItemAvatar>
                <ListItemText primary={todo.todos.text} secondary={<p className={styles.todoUser}>---{todo.todos.user}</p>} />
            </ListItem>
            {!(user.displayName!=todo.todos.user)? 
            (
                <div className={styles.todoButtons}>
                <Edit onClick={e => setOpen(true)} />
                <Delete onClick={event => db.collection('todos').doc(todo.id).delete()} />
                </div>
            ):(
                <div className={styles.todoButtons}>
                </div>
            )}            
           
        </List>
        </>
    )
}

export default Todo
