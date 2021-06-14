import isNullOrUndefined from 'utils/isNullOrUndefined';

export const orderSettings = settings =>
  settings && {
    video: settings.video,
    image: settings.image,
    title: settings.title,
    subtitle: settings.subtitle,
    narratorSkippable: settings.narratorSkippable,
    ...(!isNullOrUndefined(settings.proceed_button) && {
      proceed_button: settings.proceed_button,
    }),
    ...(!isNullOrUndefined(settings.required) && {
      required: settings.required,
    }),
    ...(!isNullOrUndefined(settings.show_number) && {
      show_number: settings.show_number,
    }),
  };
