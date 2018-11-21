import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import colors from 'assets/css/partials/_variables.scss'
import downIconWhite from 'assets/img/down-white.svg'
import upIconWhite from 'assets/img/up-white.svg'
import downIconBlack from 'assets/img/down.svg'
import upIconBlack from 'assets/img/up.svg'

const Wrapper = styled.div`
  display: inline-flex;
  text-transform: ${props => (props.uppercase ? 'uppercase' : 'none')};
  position: relative;
`
const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: inherit;
`
const Button = styled.div`
  align-self: flex-start;
  font-family: 'Montserrat', Helvetica, sans-serif;
  & > img {
    width: 21px;
  }
`
const DropdownIcon = styled.span`
  display: flex;
  align-items: center;
  padding-left: 2px;
  width: 5px;
  height: 15px;
  & > img {
    width: 5px;
    height: 5px;
  }
`
const DropdownList = styled.ul`
  background-clip: padding-box;
  background-color: ${props =>
    props.color !== 'white' ? colors['whiteColor'] : colors['blueHeavyColor']};
  border: 1px solid ${colors['lightColor']};
  border-radius: 4px;
  opacity: 0.9;
  bottom: 0px;
  #box-sizing: border-box;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
  display: ${props => (props.toggled ? 'block' : 'none')};
  float: none;
  height: auto;
  width: inherit;
  line-height: 20px;
  list-style-image: none;
  list-style-position: outside;
  list-style-type: none;
  margin: 2px -5px;
  max-height: 400px;
  min-width: 10px;
  overflow: auto;
  padding: 5px 0px;
  position: absolute;
  right: 0;
  ${props =>
    props.down
      ? 'top: 25px; bottom: auto;'
      : 'top: auto; bottom: 25px;'} z-index: 10;
`

const DropdownItem = styled.li`
  color: ${props => props.theme['gray-5']};
  cursor: pointer;
  padding: 3px 10px;
  font-family: 'Montserrat', Helvetica, sans-serif;
  font-size: 14px;
  font-weight: 300;
  text-align: left;
  text-size-adjust: 100%;
  white-space: nowrap;
`

const Dropdown = props => {
  const {
    color,
    down,
    uppercase,
    toggled,
    selectedItem,
    items,
    handleClick,
    handleCallback
  } = props

  const upIcon = color === 'white' ? upIconWhite : upIconBlack
  const downIcon = color === 'white' ? downIconWhite : downIconBlack

  return (
    <Wrapper uppercase={uppercase}>
      <DropdownList toggled={toggled} down={down} color={color}>
        {items.map((item, index) => {
          return (
            <DropdownItem key={index} onClick={handleCallback.bind(null, item)}>
              {item.image ? <img src={item.image} alt="" /> : item.text}
            </DropdownItem>
          )
        })}
      </DropdownList>
      <ButtonContainer color={color} onClick={handleClick}>
        <Button>
          {selectedItem.image ? (
            <img src={selectedItem.image} alt="" />
          ) : (
            selectedItem.text
          )}
        </Button>
        <DropdownIcon name="down-arrow" size="8px">
          <img src={toggled ? upIcon : downIcon} alt="" />
        </DropdownIcon>
      </ButtonContainer>
    </Wrapper>
  )
}

Dropdown.defaultProps = {
  color: 'white',
  toggled: false,
  selectedValue: 0,
  uppercase: true,
  down: false
}

Dropdown.propTypes = {
  selectedValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  items: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })
  ),
  callback: PropTypes.func.isRequired,
  toggled: PropTypes.bool,
  color: PropTypes.string,
  uppercase: PropTypes.bool,
  down: PropTypes.bool
}

export default Dropdown
