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

export const registrationValidationSchema = () => {
    return yup.object().shape({
        login: yup
        .string()
        .required('Обязательное поле')
        .min(3, 'От 3 до 20 символов')
        .max(20, 'От 3 до 20 символов')
        .trim(),
        password: yup
        .string()
        .min(6, 'Не менее 6 символов')
        .required('Обязательное поле'),
        confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], 'Пароли должны совпадать')
        .required('Обязательное поле')
      });
} 