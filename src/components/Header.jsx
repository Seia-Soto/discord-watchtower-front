import * as React from 'react'

import {
  Box,
  Container,
  Heading
} from '@chakra-ui/react'

export default props => {
  return (
    <Box style={{ background: '#23272A' }}>
      <Container maxW='1200px'>
        <Heading
          size='md'
          color='white'
          style={{ padding: '12px 0' }}
        >
          Discord Watchtower
        </Heading>
      </Container>
    </Box>
  )
}
