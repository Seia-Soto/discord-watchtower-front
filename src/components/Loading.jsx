import * as React from 'react'

import {
  Container,
  Spinner,
  Text
} from '@chakra-ui/react'

const RapidView = props => {
  return (
    <Container centerContent>
      <Spinner size='lg' color='white' />
      <Text
        fontSize='lg'
        style={{
          paddingTop: '8px'
        }}
      >
        Discord 음성 서버 정보 가져오는 중
      </Text>
    </Container>
  )
}

export default RapidView
