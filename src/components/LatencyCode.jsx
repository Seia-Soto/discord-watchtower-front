import * as React from 'react'
import PropTypes from 'prop-types'
import { Code } from '@chakra-ui/react'

const LatencyCode = props => {
  const { latency } = props

  if (!latency) {
    return <Code colorScheme='red'>비가용 서버</Code>
  }

  let colorScheme = 'gray'

  if (latency > 250) {
    colorScheme = 'red'
  }
  if (latency > 100) {
    colorScheme = 'yellow'
  }
  if (latency > 50) {
    colorScheme = 'teal'
  }
  if (latency > 10) {
    colorScheme = 'blue'
  }

  return <Code colorScheme={colorScheme}>{latency} ms</Code>
}

LatencyCode.propTypes = {
  latency: PropTypes.number
}

export default LatencyCode
