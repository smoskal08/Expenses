import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

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
  justify-content: space-between;
  align-items: center;
  list-style: none;
`

export const StyledProfileWrapper = styled.li`
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

export const StyledProfile = styled.p`
  ${baseLink}
  text-align: left;
`

export const StyledLinkWrapper = styled.li`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`

export const StyledLink = styled(NavLink)`
  margin-left: 50px;
  ${baseLink}
  
  &.active {
    display: none;
  }
`

export const StyledLogoutButton = styled.button`
  margin-left: 50px;
  border: none;
  ${baseLink}
  background-color: transparent;
  cursor: pointer;
`