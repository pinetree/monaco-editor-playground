import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MonacoEditor from 'react-monaco-editor'

class Editor extends Component {
  constructor (props) {
    super(props)
    this.state = {
      code: props.code || ''
    }
  }

  componentDidUpdate = (prevProps) => {
    if(prevProps.code !== this.props.code)
      this.setState({
        code: this.props.code
      })
  }

  onChange = (newValue, e) => {
    // console.log('onChange', newValue, e) // eslint-disable-line no-console
    this.props.onChangeCode(newValue)
  }

  editorDidMount = (editor) => {
    // eslint-disable-next-line no-console
    // console.log('editorDidMount', editor, editor.getValue(), editor.getModel())
    this.editor = editor
  }

  changeEditorValue = () => {
    if (this.editor) {
      this.editor.setValue('// code changed! \n')
    }
  }

  changeBySetState = () => {
    this.setState({ code: '// code changed by setState! \n' })
  }

  render () {
    const { code } = this.state
    const options = {
      selectOnLineNumbers: true,
      roundedSelection: false,
      readOnly: false,
      cursorStyle: 'line',
      automaticLayout: true,
      scrollBeyondLastLine: false
    }
    return (
      <div className="editor-container">
        <MonacoEditor
          height="300"
          language="sol"
          value={code}
          options={options}
          onChange={this.onChange}
          editorDidMount={this.editorDidMount}
        />
      </div>
    )
  }
}

Editor.propTypes = {
  code: PropTypes.string,
  onChangeCode: PropTypes.func
}

Editor.defaultProps = {
  code: '',
  onChangeCode: () => {}
}

export default Editor
