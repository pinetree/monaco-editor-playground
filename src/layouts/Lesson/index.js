import React, { Component } from 'react'
import { isNil, find, findIndex, propEq } from 'ramda'
import Button from 'components/Button'
import Editor from 'components/Editor'
import Highlight from 'components/Highlight'
import decomment from 'decomment'

const Lessons = [
  {
    id: 1,
    subject: 'Structure of a Contract',
    text: 'Contracts in Solidity are equal to classes in object-oriented languages. Each contract can contain declarations of State Variables, Functions, Function Modifiers, Events, Struct Types and Enum Types. Furthermore, contracts can inherit from other contracts.',
    tasks: [
      {
        id: 1,
        order: 1,
        task_description: 'Here we have defined our first contract, now you can define your own!\nDefine a contract with name “MyAnimal”',
        code: 'contract SimpleContract {//  Contract\n// ...\n}',
        target_code: 'contract MyAnimal {\n\n}',
        passed: 0,
        try: 0
      },
      {
        id: 2,
        order: 2,
        subject: 'State Variables',
        text: 'State variables are variables whose values are permanently stored in contract storage',
        task_description: 'The first type we get to know is unit, later we will get to know that there are a lot of different types of integers and other types such strings, book, etc. But keep in mind the structure of declaration: “type name;”. Define a string variable “name”.',
        code: 'contract SimpleContract {\nuint simpleVariable; // State variable\n// ...\n}',
        target_code: 'contract MyAnimal {\nstring name;\n}',
        passed: 0,
        try: 0
      },
      {
        id: 3,
        order: 3,
        subject: 'Functions',
        text: 'Functions are the executable units of code within a contract.',
        task_description: 'Later we will understand the difference in between of various functions but for now we need to declare our own function “walk”.',
        code: 'contract SimpleContract {\n\tuint simpleVariable; // State variable\n\t\tfunction simpleFunction() { // Function\n\t// ...\n\t}\n}',
        target_code: 'contract MyAnimal {\n\tstring name;\n\t\tfunction walk() {\n\t}\n}',
        passed: 0,
        try: 0
      }
    ],
    passed: 0,
    try: 0
  },
  {
    id: 2,
    subject: 'Layout of a Solidity Source File',
    text: 'Contracts in Solidity are equal to classes in object-oriented languages. Each contract can contain declarations of State Variables, Functions, Function Modifiers, Events, Struct Types and Enum Types. Furthermore, contracts can inherit from other contracts.',
    tasks: [
      {
        id: 10,
        order: 1
      }
    ]
  }
]

let currentCode = ''

class Lesson extends Component {
  constructor (props) {
    super(props)

    this.state = {
      lessons: Lessons,
      isLoading: false,
      activeLesson: 1,
      activeTask: 1,
      currentCode: ''
    }
  }

  currentLessonIndex = () => findIndex(propEq('id', this.state.activeLesson), this.state.lessons)

  currentLesson = () => {
    const currentLessonIndex = this.currentLessonIndex()
    return !isNil(currentLessonIndex) ? this.state.lessons[currentLessonIndex] : null
  }

  currentTaskIndex = () => {
    const currentLessonTasks = this.currentLessonTasks()
    return !isNil(currentLessonTasks) ? findIndex(propEq('id', this.state.activeTask), currentLessonTasks) : null
  }

  currentLessonTasks = () => {
    const currentLesson = this.currentLesson()
    return !isNil(currentLesson) ? currentLesson.tasks : null
  }

  currentTask = () => {
    const currentTaskIndex = this.currentTaskIndex()
    const currentLesson = this.currentLesson()
    return !isNil(currentTaskIndex) ? currentLesson.tasks[currentTaskIndex] : null
  }

  nextLesson = () => {
    const currentLessonIndex = this.currentLessonIndex()

    if (currentLessonIndex <= this.state.lessons.length)
      this.setState({
        activeLesson: this.state.lessons[currentLessonIndex + 1].id,
        activeTask: this.state.lessons[currentLessonIndex + 1].tasks[0]
      })
  }

  nextTask = () => {
    const currentLessonTasks = this.currentLessonTasks()
    const currentTaskIndex = this.currentTaskIndex()

    currentCode = ''

    if (!isNil(currentTaskIndex)) {
      if (currentTaskIndex >= currentLessonTasks.length - 1)
        this.nextLesson()
      else
        this.setState({
          activeTask: currentLessonTasks[currentTaskIndex + 1].id
        })
    }
  }

  prevTask = () => {
    const currentTaskIndex = this.currentTaskIndex()

    currentCode = ''

    if (!isNil(currentTaskIndex)) {
      if (currentTaskIndex <= 0)
        this.setState({
          activeLesson: 1,
          activeTask: 1
        })
      else
        this.setState({
          activeTask: 1
        })
    }
  }

  onChangeCode = code => currentCode = code

  formatCode = code => decomment(code).toString().toLowerCase().replace(/\s+/g, '')

  checkCode = () => {
    const task = this.currentTask()
    const currentLessonIndex = this.currentLessonIndex()
    const currentTaskIndex = this.currentTaskIndex()
    let _lessons = [...this.state.lessons]

    if (!isNil(task)) {
      if (this.formatCode(task.target_code) !== this.formatCode(currentCode)) {
        alert('Not passed!')
        _lessons[currentLessonIndex].tasks[currentTaskIndex].try += 1
        this.setState({
          _lessons
        })
      }
      else {
        alert('Passed')
        _lessons[currentLessonIndex].tasks[currentTaskIndex].passed = 1
        this.setState({
          _lessons
        })
        this.nextTask()
      }
    }
  }

  render () {
    const { lessons, activeLesson, activeTask } = this.state
    const lesson = find(propEq('id', activeLesson), Lessons) || []
    const task = find(propEq('id', activeTask), lesson.tasks) || []

    currentCode = currentCode != '' ? currentCode : task.code

    return (
      <div>
        <div className="row">
          <div className="col-1-2">
            <h1>Lesson {lesson.id}: {lesson.subject}</h1>
            <p>{lesson.text}</p>

            <div className="task">
              <h2>Task {task.order}: {task.subject}</h2>
              {task.text ? <p>{task.text}</p> : ''}

              <Highlight className="sol">
                {task.code}
              </Highlight>

              <p>{task.task_description}</p>
            </div>
          </div>
          <div className="col-auto editor">
            <Editor code={currentCode} onChangeCode={this.onChangeCode}/>

            <Button onClick={this.prevTask}>&laquo; Prev task</Button>

            <Button
              nature={task.passed ? 'green' : 'primary'}
              disabled={task.passed ? true : false}
              onClick={this.checkCode}>{task.passed ? 'Test passed' : 'Check answer'}</Button>

            <Button onClick={this.nextTask}>Next task &raquo;</Button>

            {task.try > 0 ? <p>Try: {task.try}</p> : ''}
          </div>
        </div>
      </div>
    )
  }
}

export default Lesson
