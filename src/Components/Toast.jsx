import React from 'react'
import styles from './Toast.module.css'

function Toast({msg}) {
  if (!msg) return null;
  return (
    <div className={styles.toast}>{msg}</div>
  )
}

export default Toast