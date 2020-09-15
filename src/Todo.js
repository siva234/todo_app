import React, { useState } from 'react'
import './Todo.css';

import db from './firebase';
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

function Todo(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState('');

    const updateTodo = () => {
        db.collection('todos').doc(props.todo.id).set({
            todo: input,
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
                <input placeholder={props.todo.todo} value={input} onChange={event => setInput(event.target.value)} />
                <Button disabled={!input} onClick={updateTodo} variant="contained" color="primary">Update ToDo</Button>
            </div>
        </Modal>
        <List>
            <ListItem>
                <ListItemAvatar>
                </ListItemAvatar>
                <ListItemText primary={props.todo.todo} secondary="--END--" />
            </ListItem>
            <Edit onClick={e => setOpen(true)} />
            <Delete onClick={event => db.collection('todos').doc(props.todo.id).delete()} />
        </List>
        </>
    )
}

export default Todo
