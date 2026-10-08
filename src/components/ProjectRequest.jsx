import { useId, useRef, useState } from 'react'
import { request, contact } from '../site/content.js'

const [company, goal, start] = request.steps

// The request as a plain e-mail: Viktor reads it as written.
function mailto(form) {
  const data = new FormData(form)
  const lines = [
    `${company.question}\n${data.get('company')}`,
    `${goal.question}\n${data.getAll('goal').join(', ') || '–'}`,
    `${start.question}\n${data.get('start') || '–'}`,
    `${start.name}: ${data.get('name') || '–'}`,
    `${start.contact}: ${data.get('contact')}`,
  ]
  const query = `subject=${encodeURIComponent(request.subject)}&body=${encodeURIComponent(lines.join('\n\n'))}`
  return `mailto:${contact.email}?${query}`
}

const Step = ({ n, step, children }) => (
  <fieldset className="request__step">
    <legend className="request__legend">
      <span className="request__count">
        {n} / {request.steps.length}
      </span>
      <span className="request__label">{step.label}</span>
    </legend>
    {children}
  </fieldset>
)

const Choice = ({ type, name, options }) => (
  <div className="request__options">
    {options.map((option) => (
      <label className="request__option" key={option}>
        <input type={type} name={name} value={option} />
        <span className="request__option-mark" aria-hidden="true" />
        <span className="request__option-label">{option}</span>
      </label>
    ))}
  </div>
)

/**
 * "Projekt anfragen": three short steps, all visible at once, numbered so
 * it is always clear how much is left. No backend: sending opens the
 * visitor's mail program with the request written out.
 */
export default function ProjectRequest() {
  const id = useId()
  const [sent, setSent] = useState(null)
  const confirmation = useRef(null)

  const onSubmit = (event) => {
    event.preventDefault()
    const href = mailto(event.currentTarget)
    setSent(href)
    window.location.href = href
    requestAnimationFrame(() => confirmation.current?.focus())
  }

  if (sent) {
    return (
      <div className="request__sent" ref={confirmation} tabIndex={-1} role="status">
        <p className="request__sent-title">
          {request.sent.title[0]} <span>{request.sent.title[1]}</span>
        </p>
        <p className="request__sent-text">{request.sent.text}</p>
        <a className="request__again" href={sent}>
          {request.sent.again}
        </a>
      </div>
    )
  }

  return (
    <form className="request__form" onSubmit={onSubmit}>
      <Step n={1} step={company}>
        <label className="request__question" htmlFor={`${id}-company`}>
          {company.question}
        </label>
        <input
          className="request__input"
          id={`${id}-company`}
          name="company"
          type="text"
          placeholder={company.placeholder}
          autoComplete="organization"
          required
        />
      </Step>

      <Step n={2} step={goal}>
        <p className="request__question">
          {goal.question} <span className="request__hint">{goal.hint}</span>
        </p>
        <Choice type="checkbox" name="goal" options={goal.options} />
      </Step>

      <Step n={3} step={start}>
        <p className="request__question">{start.question}</p>
        <Choice type="radio" name="start" options={start.options} />
        <div className="request__fields">
          <label className="request__field">
            <span className="request__field-label">{start.name}</span>
            <input className="request__input" name="name" type="text" autoComplete="name" />
          </label>
          <label className="request__field">
            <span className="request__field-label">{start.contact}</span>
            <input className="request__input" name="contact" type="text" autoComplete="email" required />
          </label>
        </div>
      </Step>

      <div className="request__send">
        <button className="request__submit" type="submit">
          {request.submit} <span aria-hidden="true">→</span>
        </button>
        <p className="request__note">{request.note}</p>
      </div>
    </form>
  )
}
