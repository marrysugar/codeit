import styles from './Modal.module.scss'
import {Portal} from './Portal'
import { useCallback } from 'react'
import PropTypes from 'prop-types'

export const Modal = ({
  open,
  handleClose,
  children,
}) => {
  const preventBubble = useCallback((e) => {
    e.stopPropagation()
    e.preventDefault()
  }, [])

  return (
    open ? 
      <Portal>
        <div className={styles.overlay} onClick={handleClose}>
          <div className={styles.modal} onClick={preventBubble}>
            {children}
          </div>
        </div>
      </Portal>
    :
      null
  )
}

Modal.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
}
