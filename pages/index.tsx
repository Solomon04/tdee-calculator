import {Inter} from '@next/font/google'
import Head from 'next/head'

import {FormEvent, useMemo, useState} from 'react'

type Unit = 'Imperial' | 'Metric'
type Gender = 'Male' | 'Female'

const inter = Inter({ subsets: ['latin'] })

const imperialHeights = [
  { key: '4ft 7in', value: 55 },
  { key: '4ft 8in', value: 56 },
  { key: '4ft 9in', value: 57 },
  { key: '4ft 10in', value: 58 },
  { key: '4ft 11in', value: 59 },
  { key: '5ft 0in', value: 60 },
  { key: '5ft 1in', value: 61 },
  { key: '5ft 2in', value: 62 },
  { key: '5ft 3in', value: 63 },
  { key: '5ft 4in', value: 64 },
  { key: '5ft 5in', value: 65 },
  { key: '5ft 6in', value: 66 },
  { key: '5ft 7in', value: 67 },
  { key: '5ft 8in', value: 68 },
  { key: '5ft 9in', value: 69 },
  { key: '5ft 10in', value: 70 },
  { key: '5ft 11in', value: 71 },
  { key: '6ft 0in', value: 72 },
  { key: '6ft 1in', value: 73 },
  { key: '6ft 2in', value: 74 },
  { key: '6ft 3in', value: 75 },
  { key: '6ft 4in', value: 76 },
  { key: '6ft 5in', value: 77 },
  { key: '6ft 6in', value: 78 },
  { key: '6ft 7in', value: 79 },
  { key: '6ft 8in', value: 80 },
  { key: '6ft 9in', value: 81 },
  { key: '6ft 10in', value: 82 },
  { key: '6ft 11in', value: 83 },
  { key: '7ft 0in', value: 84 },
]

const activityLevels = [
  {key: 'Sedentary (office job)', value: 1.2},
  {key: 'Light Exercise (1-2 days/week)', value: 1.375},
  {key: 'Moderate Exercise (3-5 days/week)', value: 1.55},
  {key: 'Heavy Exercise (6-7 days/week)', value: 1.725},
  {key: 'Athlete (2x per day)', value: 1.9},
]

export default function Home() {
  const [unit, setUnit] = useState<Unit>('Imperial')
  const [gender, setGender] = useState<Gender>('Male')
  const [age, setAge] = useState<number>(18)
  const [height, setHeight] = useState<number>(70)
  const [weight, setWeight] = useState<number>(100)
  const [activityLevel, setActivityLevel] = useState<number>(1.2)
  const [tdee, setTdee] = useState<number|undefined>()
  const [bmr, setBmr] = useState<number|undefined>()
  const [isCalculated] = useMemo(() => {
    return [
        bmr && tdee
    ]
  }, [bmr, tdee])

  const calculateTDEE = (
    weight: number,
    height: number,
    age: number,
    gender: string,
    activityLevel: number,
    unit: Unit
  ) => {
    let BMR: number

    // Mifflin-St Jeor equation
    if (unit === 'Imperial') {
      weight = weight / 2.2046
      height = height * 2.54
    }


    BMR = 10 * weight + 6.25 * height - 5 * age + (gender === 'male' ? 5 : -161)
    console.log({BMR})

    // Calculate BMR using the Harris-Benedict equation
    // Multiply BMR by the appropriate activity factor to get TDEE
    console.log('Harris-Benedict equation')
    return {
      bmr: BMR,
      tdee: BMR * activityLevel
    }
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const {tdee, bmr} = calculateTDEE(
        weight,
        height,
        age,
        gender,
        activityLevel,
        unit
    )

    setTdee(tdee)
    setBmr(bmr)
  }

  const calculateCaloriesForWeightLoss = (TDEE: number, weightLossPercent: number) => {
    let calorieDeficit = TDEE * (weightLossPercent / 100);
    return TDEE - calorieDeficit;
  }

  const calculateCaloriesForWeightGain = (TDEE: number, weightLossPercent: number) => {
    let calorieDeficit = TDEE * (weightLossPercent / 100);
    return TDEE + calorieDeficit;
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <section className='max-w-2xl mx-auto py-8'>
          <h1 className='text-center font-semibold text-2xl leading-10'>
            TDEE Calculator
          </h1>
          <p className='text-gray-600 text-sm font-light'>
            Total daily energy expenditure (TEE) is the average number of
            calories you burn per day. You can accurately estimate your TDEE
            with your weight, height, age, and activity level. Once you know
            your TDEE, you can use this number to determine how many calories
            you should eat every day to lose, gain, or maintain your weight
          </p>
          <div>
            <form onSubmit={handleSubmit} className='mt-5'>
              <div className='grid sm:grid-cols-6 gap-8'>
                <div className='col-span-2'>
                  <label
                    htmlFor='unit'
                    className='block text-sm font-medium text-gray-700 mb-1'>
                    Unit
                  </label>
                  <select
                    id='unit'
                    name='unit'
                    className=' block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-primary focus:outline-none focus:ring-primary sm:text-sm'
                    onChange={(e) => setUnit(e.target.value as Unit)}
                    value={unit}
                    required={true}>
                    <option>Imperial</option>
                    <option>Metric</option>
                  </select>
                </div>

                <div className='col-span-2'>
                  <label
                    htmlFor='gender'
                    className='block text-sm font-medium text-gray-700 mb-1'>
                    Gender
                  </label>
                  <select
                    id='gender'
                    name='gender'
                    className='block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-primary focus:outline-none focus:ring-primary sm:text-sm'
                    onChange={(e) => setGender(e.target.value as Gender)}
                    value={gender}
                    required={true}>
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </div>

                <div className='col-span-2'>
                  <label
                    htmlFor='weight'
                    className='block text-sm font-medium text-gray-700 mb-1'>
                    Weight ({unit === 'Imperial' ? 'lbs' : 'kg'})
                  </label>
                  <div className=''>
                    <input
                      type='number'
                      min={5}
                      name='weight'
                      id='weight'
                      className='block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm'
                      placeholder={unit === 'Imperial' ? 'lbs' : 'kg'}
                      required={true}
                      value={weight}
                      onChange={(e) => setWeight(e.target.valueAsNumber)}
                    />
                  </div>
                </div>

                <div className='col-span-2'>
                  <label
                    htmlFor='height'
                    className='block text-sm font-medium text-gray-700 mb-1'>
                    Height ({unit === 'Imperial' ? 'ft' : 'cm'})
                  </label>
                  {unit === 'Imperial' ? (
                    <select
                      name='height'
                      className='block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-primary focus:outline-none focus:ring-primary sm:text-sm'
                      id='height'
                      value={height}
                      onChange={e => setHeight(e.target.value as unknown as number)}>
                      {imperialHeights.map((imperialHeight) => (
                        <option
                          key={imperialHeight.key}
                          value={imperialHeight.value}>
                          {imperialHeight.key}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type='number'
                      min={30}
                      name='height'
                      id='height'
                      className='block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm'
                      placeholder={'cm'}
                      value={height}
                      onChange={(e) => setHeight(e.target.valueAsNumber)}
                    />
                  )}
                </div>

                <div className='col-span-2'>
                  <label
                    htmlFor='age'
                    className='block text-sm font-medium text-gray-700 mb-1'>
                    Age
                  </label>
                  <input
                    type='number'
                    min={1}
                    name='age'
                    id='age'
                    className='block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm'
                    value={age}
                    onChange={(e) => setAge(e.target.valueAsNumber)}
                  />
                </div>

                <div className='col-span-6'>
                  <label
                    htmlFor='location'
                    className='block text-sm font-medium text-gray-700 mb-1'>
                    Activity Level
                  </label>
                  <select
                    name='activity'
                    className='block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-primary focus:outline-none focus:ring-primary sm:text-sm'
                    id='activity'
                    value={activityLevel}
                    onChange={e => setActivityLevel(e.target.value as unknown as number)}>
                    {
                      activityLevels.map(level => (
                          <option key={level.key} value={level.value}>{level.key}</option>
                      ))
                    }
                  </select>
                </div>
              </div>

              <button type='submit' className='flex items-center justify-center py-2 px-3 rounded w-full bg-primary text-white mt-3'>
                {(bmr && tdee) ? 'Recalculate' : 'Calculate'}
              </button>
            </form>

            {
              (bmr && tdee) && (
                <div className='border-t border-gray-200 py-4'>
                  <h2 className='text-lg font-medium text-center mb-5'>Your Stats</h2>
                  <div className='grid sm:grid-cols-2 gap-y-12 gap-x-8'>
                    <div>
                      <h2 className='font-medium text-center tracking-tight'>Total Daily Energy Expenditure (TDEE)</h2>
                      <div className='flex items-center justify-center'>
                        <h3 className='text-primary text-5xl font-semibold'>{tdee.toFixed(0)}</h3> {' '}
                        <span className='ml-1 text-black font-semibold text-lg'> / cal</span>
                      </div>
                    </div>

                    <div>
                      <h2 className='font-medium text-center tracking-tight'>Basal Metabolic Rate (BMR)</h2>
                      <div className='flex items-center justify-center'>
                        <h3 className='text-primary text-5xl font-semibold'>{bmr.toFixed(0)}</h3> {' '}
                        <span className='ml-1 text-black font-semibold text-lg'> / cal</span>
                      </div>
                    </div>

                    <div className='bg-white shadow p-2'>
                      <div className='flex items-center justify-center mb-4'>
                        <img src='/scale.png' alt='scale icon' className='w-12 h-12'/>
                      </div>
                      <h2 className='font-medium text-center tracking-tight text-lg'>Calories to lose weight</h2>
                      <ul className='px-2 py-3 space-y-5'>
                        <li className='flex items-center justify-between'>
                          <div>
                            <h4 className='font-medium text-sm'>Easy</h4>
                            <span className='text-gray-600'>(Lose 10% of current weight)</span>
                          </div>
                          <h4 className='font-medium text-sm'>{new Intl.NumberFormat('en-US', { maximumSignificantDigits: 3 }).format(calculateCaloriesForWeightLoss(tdee, 10))}</h4>
                        </li>
                        <li className='flex items-center justify-between'>
                          <div>
                            <h4 className='font-medium text-sm'>Steady</h4>
                            <span className='text-gray-600'>(Lose 15% of current weight)</span>
                          </div>
                          <h4 className='font-medium text-sm'>{new Intl.NumberFormat('en-US', { maximumSignificantDigits: 3 }).format(calculateCaloriesForWeightLoss(tdee, 15))}</h4>
                        </li>
                        <li className='flex items-center justify-between'>
                          <div>
                            <h4 className='font-medium text-sm'>Aggressive</h4>
                            <span className='text-gray-600'>(Lose 25% of current weight)</span>
                          </div>
                          <h4 className='font-medium text-sm'>{new Intl.NumberFormat('en-US', { maximumSignificantDigits: 3 }).format(calculateCaloriesForWeightLoss(tdee, 25))}</h4>
                        </li>
                      </ul>
                    </div>

                    <div className='bg-white shadow p-2'>
                      <div className='flex items-center justify-center mb-4'>
                        <img src='/muscle.png' alt='muscle icon' className='w-12 h-12'/>
                      </div>
                      <h2 className='font-medium text-center tracking-tight text-lg'>Calories to gain weight</h2>
                      <ul className='px-2 py-3 space-y-5'>
                        <li className='flex items-center justify-between'>
                          <div>
                            <h4 className='font-medium text-sm'>Recomp</h4>
                            <span className='text-gray-600'>(Gain 10% of current weight)</span>
                          </div>
                          <h4 className='font-medium text-sm'>{new Intl.NumberFormat('en-US', { maximumSignificantDigits: 3 }).format(calculateCaloriesForWeightGain(tdee, 10))}</h4>
                        </li>
                        <li className='flex items-center justify-between'>
                          <div>
                            <h4 className='font-medium text-sm'>Slow Gain</h4>
                            <span className='text-gray-600'>(Gain 15% of current weight)</span>
                          </div>
                          <h4 className='font-medium text-sm'>{new Intl.NumberFormat('en-US', { maximumSignificantDigits: 3 }).format(calculateCaloriesForWeightGain(tdee, 15))}</h4>
                        </li>
                        <li className='flex items-center justify-between'>
                          <div>
                            <h4 className='font-medium text-sm'>Lean Bulk</h4>
                            <span className='text-gray-600'>(Gain 25% of current weight)</span>
                          </div>
                          <h4 className='font-medium text-sm'>{new Intl.NumberFormat('en-US', { maximumSignificantDigits: 3 }).format(calculateCaloriesForWeightGain(tdee, 25))}</h4>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                )
            }
          </div>
        </section>
      </main>
    </>
  )
}
