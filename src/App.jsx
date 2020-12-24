import * as React from 'react'
import {
  useDispatch,
  useSelector
} from 'react-redux'
import fetch from 'unfetch'
import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Link,
  Stack,
  Progress,
  useDisclosure
} from '@chakra-ui/react'

import * as dataActions from './actions/data'

import Header from './components/Header'
import LatencyCode from './components/LatencyCode'
import Loading from './components/Loading'
import RapidView from './components/RapidView'

import config from './config'

import './styles/fontOverrides.css'

const App = props => {
  const dispatch = useDispatch()
  const { data, lastMin } = useSelector(stores => stores.data, () => false)
  const [domainData, setDomainData] = React.useState([{}])
  const { isOpen, onOpen, onClose } = useDisclosure()

  React.useEffect(() => {
    const fn = async () => {
      const query = Date.now()
      const res = await fetch(config.apiRoot + '/api/v1/results?from=' + query)
      const data = await res.json()

      dispatch(dataActions.update(query, data))
    }

    fn()
  }, [])

  return (
    <>
      <Header />
      <RapidView />
      {!lastMin && <Loading />}
      <Box
        style={{
          padding: '12px'
        }}
      >
        <Container maxW='1200px' colorScheme='teal'>
          <Table variant='simple'>
            <Thead>
              <Tr>
                <Th color='#7289DA'>Domain</Th>
                <Th color='#7289DA'>Latency</Th>
              </Tr>
            </Thead>
            <Tbody>
              {
                lastMin.map((item, key) => {
                  return (
                    <Tr key={key}>
                      <Td>
                        <Link
                          onClick={() => {
                            const dataSpec = data.filter(sets => sets.domain === item.domain)

                            dataSpec.max = Math.round(Math.max(...dataSpec.map(item => Number(item.latency)))) + 1

                            setDomainData(dataSpec)

                            onOpen()
                          }}
                        >
                          {item.domain}
                        </Link>
                      </Td>
                      <Td><LatencyCode latency={item.latency} /></Td>
                    </Tr>
                  )
                })
              }
            </Tbody>
          </Table>
        </Container>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} size='xl'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>도메인 상세 정보</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Container>
              <Text>
                지연 시간 확인은 SKBB 500Mbps 유선망에서 확인되었으며,
                10개 이상의 호스트를 동시에 ICMP 쿼리하므로
                실제 값에 추가적인 지연이 발생할 수 있음을 알려드립니다.
              </Text>
              <Stack spacing={5}>
                {
                  domainData.map((entry, key) => {
                    if (entry.alive) {
                      return (
                        <Box
                          key={key}
                          style={{
                            margin: '12px 0'
                          }}
                        >
                          <Heading size='sm'>{new Date(entry.updatedAt).toISOString().replace(/T/, ' ').replace(/\..+/, '')}</Heading>
                          <Text>{entry.latency}ms</Text>
                          <Progress
                            colorScheme='teal'
                            size='sm'
                            value={entry.latency}
                            max={domainData.max}
                          />
                        </Box>
                      )
                    }

                    return null
                  })
                }
              </Stack>
            </Container>
            <Table variant='simple'>
              <Thead>
                <Tr>
                  <Th color='#7289DA'>항목</Th>
                  <Th color='#7289DA'>정보</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>도메인</Td>
                  <Td>{domainData[0].domain}</Td>
                </Tr>
                <Tr>
                  <Td>최근 지연</Td>
                  <Td><LatencyCode latency={domainData[0].latency} /></Td>
                </Tr>
                <Tr>
                  <Td>지역</Td>
                  <Td>{domainData[0].region}</Td>
                </Tr>
                <Tr>
                  <Td>패킷 손실</Td>
                  <Td>{domainData[0].packetLoss || 0}%</Td>
                </Tr>
                <Tr>
                  <Td>가용성</Td>
                  <Td>
                    {
                      domainData[0].alive
                        ? '확인됨'
                        : '확인 불가'
                    }
                  </Td>
                </Tr>
                <Tr>
                  <Td>상태 확인 중 오류</Td>
                  <Td>
                    {
                      domainData[0].error
                        ? '확인됨'
                        : '없음'
                    }
                  </Td>
                </Tr>
                <Tr>
                  <Td>확인 시각</Td>
                  <Td>{new Date(domainData[0].updatedAt).toString()}</Td>
                </Tr>
              </Tbody>
            </Table>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              닫기
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default App
