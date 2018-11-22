import React, { Component } from 'react'
import DropdownLanguage from 'components/DropdownLanguage'

class Header extends Component {
  constructor (props) {
    super(props)
    this.state = {
      fixed: false
    }
  }

  componentDidMount = () => {
    this.handleOnScroll()
    window.addEventListener('scroll', this.handleOnScroll)
  }

  componentWillUnmount = () => {
    window.removeEventListener('scroll', this.handleOnScroll)
  }

  handleOnScroll = () => {
    if (window.scrollY > 70 && !this.state.fixed) this.setState({ fixed: true })

    if (window.scrollY <= 70 && this.state.fixed)
      this.setState({ fixed: false })
  }

  render () {
    return (
      <header className={`header ${this.state.fixed ? 'noTrans' : ''}`}>
        <div className="row align-justify w1140">
          <div className="header__mob-show-menu">
            <button className="hamburger hamburger--slider">
              <span
                className="hamburger-box"
                onClick={() => this.props.toggleMobileMenu()}
              >
                <span className="hamburger-inner" />
              </span>
            </button>
          </div>
          <div className="flex-menu">
            <a className="logo" href="/">
              &nbsp;
            </a>
          </div>
          <div className="language-drop">
            <DropdownLanguage down={true} />
          </div>
        </div>
      </header>
    )
  }
}

export default Header
