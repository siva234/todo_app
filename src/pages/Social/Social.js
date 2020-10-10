import React, { useState, useEffect } from 'react';
import styles from './Social.module.css';

import Post from '../../components/Post/Post';
import CreatePost from '../../components/CreatePost/CreatePost';
import { db, auth } from '../../firebase';

function Social({user}) {
    const [posts, setPosts] = useState([]);
    
    console.log({user});

    useEffect(() => {
        db.collection('Posts').orderBy('timestamp', 'desc').onSnapshot(snapshot =>{
          setPosts(snapshot.docs.map(doc => ({id: doc.id, post: doc.data()})))
        })
      }, []);

    return (
        <div className={styles.SocialMain}>
            {user?.displayName ? (
            <CreatePost username={user.displayName} />
            ):(
                <h3>Sorry you need to login to create post</h3>
            )}
            {posts.map(({id , post}) => (
                <Post key={id} postId={id} user={user} username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
            ))}
        </div>
    )
}

export default Social
