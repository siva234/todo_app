import React, { useState, useEffect } from 'react';
import styles from './Social.module.css';

import { Button, FormControl, Input, InputLabel } from '@material-ui/core';
import Post from '../../components/Post/Post';
import db from '../../firebase';
import firebase from "firebase";

function Social() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        db.collection('Posts').orderBy('timestamp', 'desc').onSnapshot(snapshot =>{
          setPosts(snapshot.docs.map(doc => ({id: doc.id, post: doc.data()})))
        })
      }, []);

    return (
        <div>
            {posts.map(({id , post}) => (
                <Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
            ))}
        </div>
    )
}

export default Social
