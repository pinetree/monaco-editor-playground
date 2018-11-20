import React, { Component } from 'react'
import MonacoEditor from 'react-monaco-editor'

class Editor extends Component {
  constructor (props) {
    super(props)
    this.state = {
      code: 'pragma solidity ^0.4.25;\n' +
        '\n' +
        'contract HelloWorld {\n' +
        '\n' +
        '}',
    }
  }

  onChange = (newValue, e) => {
    console.log('onChange', newValue, e) // eslint-disable-line no-console
  }

  editorDidMount = (editor) => {
    // eslint-disable-next-line no-console
    console.log('editorDidMount', editor, editor.getValue(), editor.getModel())
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
      automaticLayout: false,
    }
    return (
      <div>
        <div>
          <button onClick={this.changeEditorValue}>Change value</button>
          <button onClick={this.changeBySetState}>Change by setState</button>
        </div>
        <hr/>
        <MonacoEditor
          height="500"
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

export default Editor
