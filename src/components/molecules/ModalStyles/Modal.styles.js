import styled from 'styled-components'
import ReactModal from 'react-modal'

export const StyledWrapper = styled(ReactModal)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px 15px;
  border-radius: 14px;
  box-shadow: 0 0 40px ${({ theme }) => theme.colors.black};
  background-color: #fff;
`

export const StyledButtonsBox = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 25px;
`

export const StyledInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`

export const StyledInfoParagraph = styled.p`
  font-size: 1.8rem;
`

export const StyledBoldText = styled.span`
  font-weight: bold;
`