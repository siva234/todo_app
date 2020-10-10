import React from 'react';
import styles from './Aboutme.module.css';

import CVcard from '../../components/CVcard/CVcard';

function Aboutme() {


  return (
    <div className={styles.AboutmeMain}>
        About Me
        <CVcard />
    </div>
  );
}

export default Aboutme;
