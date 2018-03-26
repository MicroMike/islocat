import React from 'react';
import { FormattedMessage } from 'react-intl';

import './Form.css'

export const Input = (props) => {
  const { label, isChecked, ...input } = props
  const checked = isChecked ? 'active' : ''

  return (
    <label htmlFor={props.id} className={checked} >
      <FormattedMessage id={label} />
      <input {...input} />
    </label>
  )
}

const RadioCheckbox = ({ type, choices, form, name, state }) => {
  const label = form + '.' + name + '.'

  return (
    <div className="radio-checkbox" >
      <FormattedMessage id={label + 'label'} />
      {choices.map(choice => {
        const inputName = type === 'radio' ? name : choice
        const isChecked = type === 'radio' ? state[name] === choice : state[choice]
        const value = type === 'radio' ? choice : ''
        const id = name + '-' + choice

        return (
          <Input
            key={id}
            type={type}
            name={inputName}
            label={label + choice}
            id={id}
            isChecked={isChecked}
            value={value}
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