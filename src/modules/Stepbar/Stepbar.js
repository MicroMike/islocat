import React from 'react';
import { connect } from 'react-redux'

import 'modules/Stepbar/stepbar.less'

const Stepbar = ({ currentStep, length }) => {
  let steps = []

  for (let step = 1; step <= length; step++) {
    steps.push(
      <button type="button" key={step}
        className={step < currentStep ? 'active' : ''}
      // onClick={step <= this.maxStep ? () => this.goToStep(step) : null}
      >{step}</button>
    )
  }

  return steps
}

const whichStepbar = (which) => {
  const mapStateToProps = (store) => ({
    currentStep: store[which].step,
  })

  return connect(mapStateToProps)(Stepbar)
}

export default whichStepbar
