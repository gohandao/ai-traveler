/* eslint-disable @typescript-eslint/no-unused-vars */
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import { useDefaultForm } from '../lib/UseDefaultForm'

import type { NextPage } from 'next'

const schema = z.object({
  cost: z.number().refine(value => value !== 0, {
    message: '予算を選択してください',
  }),
  place: z.string().refine(value => value !== '', {
    message: '場所を選択してください',
  }),
  numberOfPeople: z.number().refine(value => value !== 0, {
    message: '人数を選択してください',
  }),
  numberOfDays: z.number().refine(value => value !== 0, {
    message: '日数を選択してください',
  }),
  purpose: z.string().refine(value => value !== '', {
    message: '目的を選択してください',
  }),
})

type Schema = z.infer<typeof schema>

const COSTS = [0, 5000, 10_000, 30_000, 50_000, 70_000, 100_000, 150_000, 200_000]
const PLACES = ['東京', '大阪', 'アメリカ', 'オーストラリア']
const NUMBEROFPEOPLE = Array.from({ length: 10 }, (_, index) => index + 1)
const NUMBEROFDAYS = Array.from({ length: 10 }, (_, index) => index + 1)
const PURPOSES = ['観光', 'ビジネス', 'その他']

const Form: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useDefaultForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      cost: 0,
      place: '',
      numberOfPeople: 0,
      numberOfDays: 0,
      purpose: '',
    },
  })

  const onsubmit = (data: Schema) => {
    console.log(data)
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onsubmit)}>
        <select {...register('cost', { valueAsNumber: true })}>
          {COSTS.map(cost => (
            <option key={cost} value={cost}>
              {cost}
            </option>
          ))}
        </select>
        {errors.cost && <p style={{ color: 'red' }}>{errors.cost.message}</p>}
        <select {...register('place')}>
          {PLACES.map(place => (
            <option key={place} value={place}>
              {place}
            </option>
          ))}
        </select>
        {errors.place && <p style={{ color: 'red' }}>{errors.place.message}</p>}
        <select {...register('numberOfPeople', { valueAsNumber: true })}>
          {NUMBEROFPEOPLE.map(num => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
        {errors.numberOfPeople && <p style={{ color: 'red' }}>{errors.numberOfPeople.message}</p>}
        <select {...register('numberOfDays', { valueAsNumber: true })}>
          {NUMBEROFDAYS.map(num => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
        {errors.numberOfDays && <p style={{ color: 'red' }}>{errors.numberOfDays.message}</p>}
        <select {...register('purpose')}>
          {PURPOSES.map(purpose => (
            <option key={purpose} value={purpose}>
              {purpose}
            </option>
          ))}
        </select>
        {errors.purpose && <p style={{ color: 'red' }}>{errors.purpose.message}</p>}
        <button type="submit">送信</button>
      </form>
    </div>
  )
}

export default Form
