import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const baseLink = `
  font-size: 2rem;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #fff;
`

export const StyledWrapper = styled.nav`
  padding: 15px 25px;
  background-color: ${({ theme, route, isModalOpen }) =>
  route === 'edit' || route === 'add' ? theme.colors.secondary : isModalOpen ? theme.colors.tertiary : theme.colors.primary
  };
`

export const StyledList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  list-style: none;
  
  @media (min-width: 768px) {
    flex-direction: row;
  }
`

export const DisplayWrapper = styled.div`
  display: ${({ isVisible }) => isVisible ? 'flex' : 'none'};

  @media (min-width: 768px) {
    display: flex;
  }
`

export const StyledProfileWrapper = styled.li`
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

export const StyledProfile = styled.p`
  margin-top: 8px;
  ${baseLink}
  text-align: left;

  @media (min-width: 768px) {
    margin-top: 0;
  }
`

export const StyledLinkWrapper = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`

export const StyledLink = styled(NavLink)`
  margin-top: 8px;
  ${baseLink}
  
  &.active {
    display: none;
  }

  @media (min-width: 768px) {
    margin-left: 50px;
    margin-top: 0;
  }
`

export const StyledLogoutButton = styled.button`
  margin-top: 8px;
  border: none;
  ${baseLink}
  background-color: transparent;
  cursor: pointer;

  @media (min-width: 768px) {
    margin-left: 50px;
    margin-top: 0;
  }
`

export const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  color: ${({ theme }) => theme.colors.white};
  cursor: pointer;

  @media (min-width: 768px) {
    display: none;
  }
`