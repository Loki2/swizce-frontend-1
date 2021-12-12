import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

interface Props {}

const CreateServiceModal: React.FC<Props> = ({children}: any) => {
  const { handleAuthAction } = useContext(AuthContext);


  return (
    <div className="service__modal__container">
      <div className="service__styled__modal">
        <div className="service__modal__action" onClick={() => handleAuthAction('close') }>
            &times;
        </div>
        {children}
      </div>
    </div>
  )
}


export default CreateServiceModal;