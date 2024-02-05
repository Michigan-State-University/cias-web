import DatePicker, {
  registerLocale,
  ReactDatePicker,
  ReactDatePickerProps,
} from 'react-datepicker';
import { useSelector } from 'react-redux';
import { forwardRef } from 'react';

import es from 'date-fns/locale/es';

import { makeSelectLocale } from 'containers/AppLanguageProvider';

import { DatePickerWrapper } from './styled';

// ! Add every used language apart from english
registerLocale('es', es);

export const LocalizedDatePicker = forwardRef<
  ReactDatePicker,
  ReactDatePickerProps<string>
>((props, ref) => {
  const locale = useSelector(makeSelectLocale());

  return (
    <DatePickerWrapper>
      <DatePicker<string>
        popperModifiers={{
          // @ts-ignore
          preventOverflow: {
            padding: 10,
          },
        }}
        popperProps={{
          placement: 'bottom-start',
        }}
        locale={locale}
        {...props}
        ref={ref}
      />
    </DatePickerWrapper>
  );
});
