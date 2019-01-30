import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const Header = ({ siteTitle }) => {
  const Title = styled.div`
    text-align: center;
    width: 100%;
  `

  return (
    <Title>
      <h1>{siteTitle}</h1>
    </Title>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: '',
}

export default Header
