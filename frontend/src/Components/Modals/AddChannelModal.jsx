import ModalLayout from "./ModalLayout";
import AddChannelForm from "../AddChanalForm";

const AddChannelModal = () => {
    return(
        <ModalLayout title='Добавить канал' cancelBtn='Отмена' actionBtn='Отправить' onAction={() => {}}>
            <AddChannelForm />
        </ModalLayout>
    );
}

export default AddChannelModal;