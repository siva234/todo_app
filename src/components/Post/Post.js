import { Avatar } from '@material-ui/core'
import React from 'react'

import styles from "./Post.module.css";
import defaultAvatar from '../../Images/defaultAvatar.jpg';

function Post({ username, caption, imageUrl }) {
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
        </div>
    )
}

export default Post
