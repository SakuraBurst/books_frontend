// это очень плохо

// вообще все что связано с типаами форм билдера все плохо, наверное это как-то поэлегатнее
// можно было сделать
// я мог убрать стрикт мод для проверки ключей юнион объекта, но из двух зол выбрал меньшее
export type RegistrationForm = {
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
};

export type AuthorizationForm = {
  email?: string;
  password?: string;
};

export type NewBookForm = {
  title?: string;
  author?: string;
  year?: string;
};
