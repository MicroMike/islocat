import React, { Component } from 'react';
import { connect } from 'react-redux'

import 'modules/Stepbar/stepbar.less'

class Stepbar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      stick: false
    }
  }

  componentDidMount() {
    this.stick()
    window.addEventListener('scroll', this.stick.bind(this), true);
    // console.log(window.scrollTop, this.refs.stepbar.offset())
  }

  stick() {
    this.barOffset = this.barOffset || this.refs.stepbar.offsetTop
    const offset = window.scrollY
    this.setState({ stick: offset + 20 >= this.barOffset })
  }

  render() {
    let steps = []

    for (let step = 1; step <= this.props.length; step++) {
      steps.push(
        <button type="button" key={step}
          className={step < this.props.currentStep ? 'active' : ''}
        // onClick={step <= this.maxStep ? () => this.goToStep(step) : null}
        >{step}</button>
      )
    }

    return (
      <div>
        {this.state.stick ? <div id="shadow-stepbar" style={{ height: this.refs.stepbar.offsetHeight - 30 + 'px' }}></div> : null}
        <div id={this.props.id + '-stepbar'} ref="stepbar" className={this.state.stick ? 'stick' : ''}>{steps}</div>
      </div>
    )
  }
}

const whichStepbar = (which) => {
  const mapStateToProps = (store) => ({
    currentStep: store[which].step,
    id: which,
  })

  return connect(mapStateToProps)(Stepbar)
}

export default whichStepbar
