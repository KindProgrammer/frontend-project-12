import ModalLayout from "./ModalLayout";
import AddChannelForm from "../AddChanalForm";

const AddChannelModal = () => {
    return(
        <ModalLayout title='Добавить канал'>
            <AddChannelForm />
        </ModalLayout>
    );
}

export default AddChannelModal;