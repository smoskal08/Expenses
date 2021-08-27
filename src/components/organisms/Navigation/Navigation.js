import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from 'slices/authSlice'
import { routes } from 'routes'
import { StyledWrapper, StyledList, StyledProfileWrapper, StyledProfile, StyledLinkWrapper, StyledLink, StyledLogoutButton, StyledFontAwesomeIcon, DisplayWrapper } from './Navigation.styles'
import { faBars } from '@fortawesome/free-solid-svg-icons'

const Navigation = ({ route }) => {
  const isAuthUser = useSelector(state => state.auth.isAuthUser)
  const user = useSelector(state => state.auth.user)
  const isModalOpen = useSelector(state => state.expenses.isModalOpen)
  const [profileName, setProfileName] = useState('')
  const [menuVisible, setMenuVisible] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!!user) {
      const { firstName, lastName, email } = user
      if (firstName && lastName) {
        setProfileName(`${firstName} ${lastName}`)
      } else {
        setProfileName(email)
      }
    }
  }, [dispatch, isAuthUser, user])

  const links = () => {
    switch (route) {
      case 'register':
      case 'login':
        return (
          <>
            <StyledLink to={routes.login}>logowanie</StyledLink>
            <StyledLink to={routes.register}>rejestracja</StyledLink>
          </>
        )
      case 'home':
      case 'add':
      case 'edit':
      case 'edit-profile':
        return (
          <>
            <StyledLink exact to={routes.home}>home</StyledLink>
            <StyledLink to={routes.add}>dodaj</StyledLink>
            <StyledLink to={routes.editProfile}>edytuj profil</StyledLink>
            <StyledLogoutButton
              onClick={() => dispatch(logout())}
            >
              logout
            </StyledLogoutButton>
          </>
        )
      case 'activate':
        return
      default:
        return <Redirect to={routes.home} />
    }
  }

  const handleMenuVisibleChange = () => setMenuVisible(prevState => !prevState)

  return (
    <StyledWrapper route={route} isModalOpen={isModalOpen}>
      <StyledList>
        <StyledFontAwesomeIcon icon={faBars} onClick={handleMenuVisibleChange} />
        {
          menuVisible ? (
            <>
              <StyledProfileWrapper>
                {
                  isAuthUser ? (
                    <StyledProfile>
                      { profileName }
                    </StyledProfile>
                  ) : null
                }
              </StyledProfileWrapper>
              <StyledLinkWrapper>
                { links() }
              </StyledLinkWrapper>
            </>
          ) : null
        }
      </StyledList>
    </StyledWrapper>
  )
}

Navigation.propTypes = {
  route: PropTypes.string,
}

export default Navigation;
