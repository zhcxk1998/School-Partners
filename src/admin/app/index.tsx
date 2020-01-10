import React from 'react'
import {
  HashRouter as Router,
} from 'react-router-dom'
import { Provider } from 'mobx-react'

import Routes from '../routes'

import store from '../store'

const App = () => (
  <div>
    <Router>
      <Provider {...store}>
        <Routes />
      </Provider>
    </Router>
  </div>
)

export default App
