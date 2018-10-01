import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import drizzle from './drizzle'

ReactDOM.render(
    <App {...{ drizzle }} />,
    document.getElementById('root')
)

registerServiceWorker()