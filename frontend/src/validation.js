import * as yup from 'yup';

export const editChannelvalidationSchema = (channelsNames) => {
    return yup.object().shape({
        channelName: yup
        .string()
        .required('Обязательное поле')
        .min(3, 'От 3 до 20 символов')
        .max(20, 'От 3 до 20 символов')
        .trim()
        .notOneOf(channelsNames, 'Имя должно быть уникальным'),
      });
} 

export const registrationValidationSchema = (channelsNames) => {
    return yup.object().shape({
        channelName: yup
        .string()
        .required('Обязательное поле')
        .min(3, 'От 3 до 20 символов')
        .max(20, 'От 3 до 20 символов')
        .trim()
        .notOneOf(channelsNames, 'Имя должно быть уникальным'),
      });
} 