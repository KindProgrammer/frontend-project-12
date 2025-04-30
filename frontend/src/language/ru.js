export default {
  notFound: {
    text: '404 - Страница не найдена',
  },
  navigationMenu: {
    exitBtn: 'Выйти',
    title: 'Hexlet Chat',
  },
  loginPage: {
    title: 'Войти',
    text: 'Нет аккаунта?',
    linkText: 'Регистрация',
  },
  loginForm: {
    title: 'Войти',
    loginLabel: 'Ваш ник',
    passLabel: 'Пароль',
    submitBtn: 'Войти',
    errors: {
      illegalPassOrLogin: 'Неверные имя пользователя или пароль',
    },
  },
  registrationPage: {
    title: 'Регистрация',
  },
  registrationForm: {
    userName: 'Имя пользователя',
    password: 'Пароль',
    confirmPassword: 'Подтвердите пароль',
    submitBtn: 'Зарегистрироваться',
    errors: {
      userExists: 'Такой пользователь уже существует',
    },
  },
  channelsList: {
    channels: 'Каналы',
  },
  messagesContainer: {
    messages: {
      messages_one: '{{count}} сообщение',
      messages_few: '{{count}} сообщения',
      messages_many: '{{count}} сообщений',
    },
  },
  messagesForm: {
    ariaLabel: 'Новое сообщение',
    placeholder: 'Введите сообщение...',
    submitBtn: 'Отправить',
  },
  addChannelModal: {
    title: 'Добавить канал',
  },
  addChanalForm: {
    submitBtn: 'Отправить',
    cancelBtn: 'Отменить',
  },
  channelControlsButton: {
    deleteBtn: 'Удалить',
    renameBtn: 'Переименовать',
  },
  deleteChannelModal: {
    title: 'Удалить канал',
    text: 'Уверены?',
    cancelBtn: 'Отменить',
    deleteBtn: 'Удалить',
  },
  editChannelModal: {
    title: 'Переименовать канал',
  },
  editChannelForm: {
    cancelBtn: 'Отменить',
    submitBtn: 'Отправить',
  },
  validation: {
    editChannel: {
      required: 'Обязательное поле',
      min: 'От 3 до 20 символов',
      max: 'От 3 до 20 символов',
      notOneOf: 'Имя должно быть уникальным',
    },
    registration: {
      required: 'Обязательное поле',
      min: 'От 3 до 20 символов',
      max: 'От 3 до 20 символов',
      minPass: 'Не менее 6 символов',
      oneOf: 'Пароли должны совпадать',
    },
  },
  toasts: {
    error: {
      connectionError: 'Ошибка соединения',
      authError: 'Ошибка авторизации',
      commonError: 'Ошибка',
    },
    success: {
      channel: {
        add: 'Канал создан',
        rename: 'Канал переименован',
        delete: 'Канал удалён',
      },
    },
  },
}
