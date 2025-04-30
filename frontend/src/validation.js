import * as yup from 'yup'

export const editChannelvalidationSchema = (channelsNames, t) => {
  return yup.object().shape({
    channelName: yup
      .string()
      .required(t('validation.editChannel.required'))
      .min(3, t('validation.editChannel.min'))
      .max(20, t('validation.editChannel.max'))
      .trim()
      .notOneOf(channelsNames, t('validation.editChannel.notOneOf')),
  })
}

export const registrationValidationSchema = (t) => {
  return yup.object().shape({
    login: yup
      .string()
      .required(t('validation.registration.required'))
      .min(3, t('validation.registration.min'))
      .max(20, t('validation.registration.max'))
      .trim(),
    password: yup
      .string()
      .min(6, t('validation.registration.minPass'))
      .required(t('validation.registration.required')),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], t('validation.registration.oneOf'))
      .required(t('validation.registration.required')),
  })
}
