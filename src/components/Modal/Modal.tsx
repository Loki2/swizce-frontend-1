import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

interface Props {}

const Modal: React.FC<Props> = ({children}: any) => {
  const { handleAuthAction } = useContext(AuthContext);


  return (
    <div className="modal__container">
      <div className="styled__modal">
        <div className="modal__action" onClick={() => handleAuthAction('close') }>
            &times;
        </div>
        {children}
      </div>
    </div>
  )
}


export default Modal;