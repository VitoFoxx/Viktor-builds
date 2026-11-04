import { useSyncExternalStore } from 'react'
import { dentalRequest } from './content.js'

/**
 * BUSINESS lets the visitor answer the practice's request themselves: the
 * concern (step 1) and the time (step 3). Their pick is drawn by the
 * timeline instead of the default and carried into the summary on the
 * phone and the practice's entry the next morning. Kept in memory only.
 */
const [concern, , when] = dentalRequest.steps
const state = { concern: 0, when: 0 }
let snapshot = { ...state }
const listeners = new Set()

export function pickAnswer(key, index) {
  if (snapshot[key] === index) return
  snapshot = { ...snapshot, [key]: index }
  listeners.forEach((listener) => listener())
}

const subscribe = (listener) => {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export const useAnswers = () => useSyncExternalStore(subscribe, () => snapshot, () => state)

// The summary rows, with the visitor's answers in place.
export const summaryFor = (answers) =>
  dentalRequest.summary.map((row) => {
    if (row.label === 'Anliegen') return { ...row, value: concern.options[answers.concern] }
    if (row.label === 'Termin') return { ...row, value: when.options[answers.when] }
    return row
  })
