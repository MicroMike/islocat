import React from 'react';
import FormattedMessage from 'IntlFormat';

import 'modules/Form/form.less'

export const Input = (props) => {
  const { label, isChecked, errors, ...input } = props
  const checked = isChecked ? 'checked' : ''
  const formattedMessage = label
    ? label
    : props.name

  // console.log(errors)
  const errorClass = errors && errors.indexOf(formattedMessage) >= 0 ? 'error' : ''
  return (
    <label htmlFor={props.id} className={checked} >
      {<FormattedMessage id={formattedMessage} className={errorClass} />}
      <input {...input} checked={checked} onChange={() => { }} />
    </label>
  )
}

const RadioCheckbox = ({ type, choices, form, name, errors }) => {
  const errorClass = errors && errors.indexOf(name) >= 0 ? 'error' : ''

  return (
    <div className={'radio-checkbox ' + type} >
      <FormattedMessage id={name} className={errorClass} />
      {choices.map(choice => {
        const isString = typeof choice === 'string'
        choice = isString ? choice : choice.label
        const id = name + '-' + choice

        const attr = {
          name: type === 'radio' ? name : choice,
          value: type === 'radio' ? choice : '',
          isChecked: type === 'radio' ? form[name] === choice : form[choice]
        }

        return (
          <Input {...attr}
            key={id}
            id={id}
            type={type}
            label={choice}
          />
        )
      })}
    </div>
  )
}

export const NumberRadio = (props) => {
  const errorClass = props.errors && props.errors.indexOf(props.name) >= 0 ? 'error' : ''
  const choices = []
  let i = props.min || 0

  for (i; i <= props.max; i++) {
    const choice = i + (i === props.max ? '+' : '')
    const value = String(parseInt(choice, 10))
    const id = props.name + '-' + choice

    choices.push(
      <Input
        type="radio"
        key={id}
        id={id}
        name={props.name}
        label={choice}
        value={value}
        isChecked={props.form[props.name] === value}
      />
    )
  }

  return (
    <div className="radio-checkbox radio" >
      <FormattedMessage id={props.name} className={errorClass} />
      {choices}
    </div>
  )
}

export const Radio = (props) => (
  <RadioCheckbox {...props} type="radio" />
)

export const Checkbox = (props) => (
  <RadioCheckbox {...props} type="checkbox" />
)

export const Select = (props) => {
  return (
    <div className="select" >
      <FormattedMessage id={props.name} />
      <select name={props.name} >
        {props.options}
      </select>
    </div>
  )
}