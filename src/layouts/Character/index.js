import React from 'react'
import styled from 'styled-components'
import image from 'assets/img/_simpson.jpg'

const Wrapper = styled.div`
  display: block;
  position: relative;
  text-align: center;
`

export default () => (
  <Wrapper>
    <img src={image} alt="" />
  </Wrapper>
)
