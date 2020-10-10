import React, { useState } from 'react'
import styles from './CreatePost.module.css'

import { Button, Input } from '@material-ui/core';
import { db, storage } from '../../firebase';
import firebase from "firebase";

function CreatePost({username}) {
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const [caption, setCaption] = useState('');

    const handleChange = (e) => {
        if(e.target.files[0]){
            setImage(e.target.files[0]);
        }
    };

    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },
            (error) => {
                console.log(error);
            },
            () => {
                //upload complete
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        db.collection("Posts").add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            caption: caption,
                            imageUrl: url,
                            username: username
                        });
                        setProgress(0);
                        setCaption("");
                        setImage(null);
                    });
            }
        )
    };

    return (
        <div className={styles.createPostContainer}>
            <progress className={styles.postProgressBar} value={progress} max="100" />
            <Input type="textArea" placeholder="Enter a Caption..." onChange={event => setCaption(event.target.value)} value={caption} />
            <Input type="file" onChange={handleChange} />
            <Button className={styles.uploadButton} onClick={handleUpload}>Create Post</Button>
        </div>
    )
}

export default CreatePost
