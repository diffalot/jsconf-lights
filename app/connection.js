import React, { Component, PropTypes } from 'react'
import io from 'socket.io-client'
import { connect } from 'react-redux'
import Lights from './lights'

export class Connection extends Component {
  static propTypes = {
    url: PropTypes.string.isRequired,
    lights: PropTypes.object.isRequired,
    room: PropTypes.string.isRequired,
  }

  componentDidMount() {
    this.socket = io.connect(this.props.url)
    this.socket.on('connect', this.onConnect)
    this.socket.on('lights', this.onLights)
  }

  onConnect = () => {
    // Clear buffer while disconnected
    this.socket.sendBuffer = []

    this.socket.emit('join', this.props.room)
  }

  onLights = () => {
    console.log('got lights from another client!')
  }

  componentDidUpdate({ lights: oldLights }) {
    const { lights } = this.props
    if (lights !== oldLights) {
      this.socket.emit('lights', lights.data)
    }
  }

  render() {
    return null
  }
}

const ReduxConnection = connect(
    ({ lights, backend: { host, room } }) => ({
      lights,
      url: host,
      room,
    }),
    dispatch => ({
      onConnect: () => dispatch(backendConnect()),
      onDisconnect: () => dispatch(backendDisconnect()),
    })
)(Connection)

export default ReduxConnection
