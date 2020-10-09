import React, { useState, useEffect } from 'react';
import styles from './Social.module.css';

import { Button, FormControl, Input, InputLabel } from '@material-ui/core';
import Post from '../../components/Post/Post';
import CreatePost from '../../components/CreatePost/CreatePost';
import { db, auth } from '../../firebase';

function Social() {
    const [posts, setPosts] = useState([]);
    const [username, setUsername] = useState('');
    const [user, setUser] = useState(null);

    useEffect(() => {
        db.collection('Posts').orderBy('timestamp', 'desc').onSnapshot(snapshot =>{
          setPosts(snapshot.docs.map(doc => ({id: doc.id, post: doc.data()})))
        })
      }, []);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
          if(authUser){
            //Logged in
            setUser(authUser);
          } else {
            //logged out
            setUser(null);
          }
        })
        return () => {
          //cleanup actions
          unsubscribe();
        }
      }, [user, username]);

    return (
        <div>
            {user?.displayName ? (
            <CreatePost username={user.displayName} />
            ):(
                <h3>Sorry you need to login to create post</h3>
            )}
            {posts.map(({id , post}) => (
                <Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
            ))}
        </div>
    )
}

export default Social
