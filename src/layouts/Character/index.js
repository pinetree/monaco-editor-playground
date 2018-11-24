import React from 'react'
import styled from 'styled-components'
import image from 'assets/img/cat/Cat.svg'
import { Stage, Sprite, Container, AppConsumer } from '@inlet/react-pixi'

const Wrapper = styled.div`
  display: block;
  position: relative;
  text-align: center;
`

class RotatingBunny extends React.Component {

  state = {
    rotation: 0,
    x: 0.5,
    y: 0.5
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.startRotate !== this.props.startRotate)
      if (this.props.startRotate) {
        this.props.app.ticker.add(this.tick)
      }
      else {
        this.props.app.ticker.remove(this.tick)
        this.setState(state => ({
          rotation: 0
          // x: state.x / 1.25,
          // y: state.y / 1.25,
        }))
      }

  }

  componentWillUnmount () {
    this.props.app.ticker.remove(this.tick)
  }

  tick = (delta) => {
    this.setState(state => ({
      rotation: state.rotation + 0.1 * delta
    }))
  }

  render () {
    return (
      <Sprite image={image}
              scale={[this.state.x, this.state.y]}
              rotation={this.state.rotation}
              anchor={[0.5, 0.5]}/>
    )
  }
}

export default props => {
  return (
    <Wrapper>
      <Stage width={500} height={500} options={{ backgroundColor: 0xFFFFFF }}>
        <Container x={250} y={250}>
          <AppConsumer>
            {app => <RotatingBunny app={app} startRotate={props.startRotate}/>}
          </AppConsumer>
        </Container>
      </Stage>
    </Wrapper>
  )
}
