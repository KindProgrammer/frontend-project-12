import ModalLayout from "./ModalLayout";

const AddChannelModal = () => {
    return(
        <ModalLayout title='Создать канал' body='тело' cancelBtn='Отмена' actionBtn='Отправить' onAction={() => {}} />
    );
}

export default AddChannelModal;