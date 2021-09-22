import styled from 'styled-components'
import { Field } from 'formik'

export const Select = styled(Field)`
  display: block;
  margin: 10px 0;
  padding: 5px 10px;
  width: 100%;
  border: 1px solid gray;
  border-radius: 6px;
  font-size: 1.8rem;
  background-color: ${({ theme }) => theme.colors.white};
`