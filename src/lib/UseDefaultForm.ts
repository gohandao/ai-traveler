// https://zenn.dev/yuitosato/articles/292f13816993ef
import { type FieldValues, type UseFormProps, type UseFormReturn, useForm } from 'react-hook-form'

/**
 * defaultValuesを必ず指定するuseForm
 * @param props
 * @returns
 */
const useDefaultForm = <FORM_TYPE extends FieldValues>(
  props: UseFormProps<FORM_TYPE> & {
    defaultValues: FORM_TYPE
  },
): UseFormReturn<FORM_TYPE> => {
  return useForm({ ...props })
}

export { useDefaultForm }
