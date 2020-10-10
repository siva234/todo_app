import React, { useState, useEffect } from 'react';

import styles from "./Post.module.css";
import { Avatar, Input } from '@material-ui/core'
import defaultAvatar from '../../Images/defaultAvatar.jpg';
import { db, auth } from '../../firebase';
import firebase from "firebase";

function Post({ postId, user, username, caption, imageUrl }) {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState("");

    useEffect(() => {

        let unsubscribe;

        if(postId){
            unsubscribe = db.collection("Posts")
                            .doc(postId)
                            .collection("comments")
                            .onSnapshot((snapshot) => {
                                setComments(snapshot.docs.map((doc) => doc.data()))
                            });
        }

        return () => {
          //cleanup actions
          unsubscribe();
        }
      }, [postId]);

      const postComment = (event) => {
          event.preventDefault();
          db.collection("Posts").doc(postId).collection("comments").add({
              text: comment,
              username: user.displayName,
              timestamp: firebase.firestore.FieldValue.serverTimestamp()
          });
          setComment('');
      };

    return (
        <div className={styles.post}>
            <div className={styles.postHeader}>
                <Avatar
                    className={styles.postAvatar}
                    alt="SIVA"
                    src={defaultAvatar}                   
                    />
            <h3>{username}</h3>
            </div>
            <img className={styles.postImage} alt ="Not Available" src={imageUrl} />
            <h4 className={styles.postText}><strong>{username}</strong> {caption}</h4>
            <div className={styles.postedComments}>
                {comments.map((comment) => (
                    <p>
                        <strong>{comment.username}</strong> {comment.text}
                    </p>
                ))}                
            </div>
            <form className={styles.commentBox}>
                <Input className={styles.commentInput}
                        type="text"
                        placeholder="Add a Comment..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                />
                <button className={styles.commentButton}
                        disabled={!comment}
                        type="submit"
                        onClick={postComment}
                >Post</button>
            </form>            
        </div>
    )
}

export default Post
