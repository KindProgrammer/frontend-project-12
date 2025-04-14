import Cross from "../../assets/cross.svg?react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { closeModal, isOpenedSelector } from "../../store/slices/modalSlice";
import { useSelector, useDispatch } from "react-redux";

const ModalLayout = ({title='Модалка', body='тело', cancelBtn='Отмена', actionBtn='Отправить', onHide=closeModal, onAction=()=>{}}) => {
    const show = useSelector(isOpenedSelector);
    const dispatch = useDispatch();

    return (
          <Modal 
          show={show}
          onHide={() => {dispatch(onHide())}}
          >
            <Modal.Header closeButton>
              <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
    
            <Modal.Body>
              <p>{body}</p>
            </Modal.Body>
    
            <Modal.Footer>
              <Button onClick={() => { onAction() }} variant="secondary">{cancelBtn}</Button>
              <Button onClick={() => { onHide() }} variant="primary">{actionBtn}</Button>
            </Modal.Footer>
          </Modal>
      );
}

export default ModalLayout;
;