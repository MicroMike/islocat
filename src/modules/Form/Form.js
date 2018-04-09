import React from 'react';
import { FormattedMessage } from 'react-intl';

import './Form.css'

export const Input = (props) => {
  const { label, textLabel, isChecked, ...input } = props
  const checked = isChecked ? 'active' : ''

  return (
    <label htmlFor={props.id} className={checked} >
      {textLabel ? textLabel : <FormattedMessage id={label} />}
      <input {...input} />
    </label>
  )
}

const RadioCheckbox = ({ type, choices, form, name, state, noTrad }) => {
  const label = form + '.' + name + '.'

  return (
    <div className={'radio-checkbox ' + type} >
      <FormattedMessage id={label + 'label'} />
      {choices.map(choice => {
        const isString = typeof choice === 'string'
        choice = isString ? choice : choice.label

        const inputName = type === 'radio' ? name : choice
        const isChecked = type === 'radio' ? state[name] === choice : state[choice]
        const value = type === 'radio' ? choice : ''
        const id = name + '-' + choice

        return (
          <Input
            key={id}
            type={type}
            name={inputName}
            label={!noTrad || !isString ? label + choice : null}
            textLabel={noTrad && isString ? choice : null}
            id={id}
            isChecked={isChecked}
            value={value}
          />
        )
      })}
    </div>
  )
}

export const NumberRadio = (props) => {
  const choices = []
  let i = props.min || 0

  for (i; i <= props.max; i++) {
    choices.push(i + (i === props.max ? '+' : ''))
  }

  return (
    <div className="radio-checkbox radio" >
      <FormattedMessage id={props.label} />
      {choices.map(choice => {
        const value = String(parseInt(choice, 10))
        const id = props.name + '-' + choice

        return (
          <Input
            type="radio"
            key={id}
            id={id}
            name={props.name}
            textLabel={choice}
            value={value}
            isChecked={props.state[props.name] === value}
          />
        )
      })}
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
      <FormattedMessage id={props.form + '.' + props.name} />
      <select name={props.name} >
        {props.options}
      </select>
    </div>
  )
}