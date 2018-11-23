import React, { Component } from 'react'
import { MonacoDiffEditor } from 'react-monaco-editor'
import PropTypes from 'prop-types'
import Modal from 'react-responsive-modal'
import errorImg from 'assets/img/error-diff.png'

class Result extends Component {
  constructor (props) {
    super(props)

    this.state = {
      open: props.opened || false,
      task: props.task,
      showDiff: false
    }
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.opened !== this.props.opened)
      this.setState({
        open: this.props.opened
      })
  }

  onOpenModal = () => {
    this.setState({ open: true })
  }

  onCloseModal = () => {
    this.props.onClose()
    this.setState({ open: false, showDiff: false })
  }

  resultText = () => {
    const { task } = this.props

    if (task.passed)
      return {
        title: 'Test passed!',
        text: 'You are on a right way!',
        passed: true
      }
    else {
      return {
        title: 'Test not passed!',
        text: `Hey, man! This is your try #${task.try}. Check the lesson and try once again.`,
        passed: false
      }
    }
  }

  showDiff = () => this.setState({ showDiff: true })

  render () {
    const { open, showDiff } = this.state
    const { children, task, code } = this.props
    const { title, text, passed } = this.resultText()

    return (
      <Modal
        open={open}
        onClose={this.onCloseModal}
        classNames={{ modal: `result-modal${passed ? ' passed' : ''}` }}
        center
      >
        <h2>{title}</h2>
        <p>{!showDiff ? text : 'Hint: Marked lines show you a `diff` with the right answer.'}</p>
        {children}

        {
          !showDiff && task.passed === 0 && task.try > 1
            ? <p className="hint-prompt wiggle" onClick={this.showDiff}>Do you need help? Show hint</p>
            : ''
        }

        {showDiff ?
          <div>
            <MonacoDiffEditor
              width="800"
              height="300"
              language="sol"
              original={task.target_code}
              value={code}
              onChange={this.props.onChange}
              options={{
                minimap: {
                  enabled: false
                }
              }}
            />
            <img src={errorImg} alt="" className="hint-img"/></div>
          : null
        }

      </Modal>
    )
  }
}

Result.propTypes = {
  opened: PropTypes.bool,
  onClose: PropTypes.func,
  onChange: PropTypes.func,
  task: PropTypes.object,
  code: PropTypes.string
}

Result.defaultProps = {
  opened: false,
  onClose: () => {},
  onChange: () => {},
  task: {},
  code: ''
}

export default Result
