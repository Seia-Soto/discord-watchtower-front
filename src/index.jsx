import * as React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import {
  ChakraProvider
} from '@chakra-ui/react'

import App from './App'

import configureStore from './store'
import theme from './theme'

const { store } = configureStore()

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/#hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept()
}
