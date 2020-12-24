import * as React from 'react'
import {
  useSelector
} from 'react-redux'

import {
  Container,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatGroup
} from '@chakra-ui/react'

const RapidView = props => {
  const {
    averageLatency,
    maxLatency,
    serverFound,
    serverAvailable
  } = useSelector(
    stores => stores.data,
    () => false // NOTE: always return false;
  )

  return (
    <Container
      maxW='1200px'
      style={{
        padding: '12px'
      }}
    >
      <StatGroup>
        <Stat>
          <StatLabel>평균 지연</StatLabel>
          <StatNumber>{averageLatency || '...'}</StatNumber>
          <StatHelpText>
            ms
          </StatHelpText>
        </Stat>
        <Stat>
          <StatLabel>최대 지연</StatLabel>
          <StatNumber>{maxLatency || '...'}</StatNumber>
          <StatHelpText>
            ms
          </StatHelpText>
        </Stat>
        <Stat>
          <StatLabel>전체 서버</StatLabel>
          <StatNumber>{serverFound.length || '...'}</StatNumber>
          <StatHelpText>
            개
          </StatHelpText>
        </Stat>
        <Stat>
          <StatLabel>가용 서버</StatLabel>
          <StatNumber>{serverAvailable.length || '...'}</StatNumber>
          <StatHelpText>
            개
          </StatHelpText>
        </Stat>
      </StatGroup>
    </Container>
  )
}

export default RapidView
