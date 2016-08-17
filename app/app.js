import React, { Component } from 'react'
// import Connection from './connection'
import Lights from './lights'
import Vis from './vis'
import Editor from './editor'
import Compiler from './compiler'
import Processor from './processor'
import Toolbar from './toolbar'
import styles from './app.css'

// const connection = new Connection('http://localhost:8081')

class App extends Component {
  onClickReset = () => {
    const { processor } = this.refs
    processor.getWrappedInstance().reset()
  }

  render() {
    return (
      <div className={styles.container}>
        <Compiler />
        <Processor ref="processor" />

        <div className={styles.left}>
          <Editor />
        </div>
        <div className={styles.right}>
          <div className={styles.toolbar}>
            <Toolbar onReset={this.onClickReset} />
          </div>
          <div className={styles.vis}>
            <Vis />
          </div>
        </div>
      </div>
    )
  }
}

export default App
