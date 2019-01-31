import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

// We need to use StaticQuery if we want to allow components
// to retrieve data using GraphQL
// https://www.gatsbyjs.org/docs/static-query/

// Gatsby-image gave us many useful fragments to use:
// GatsbyImageSharpFluid, etc.
// https://www.gatsbyjs.org/packages/gatsby-image/
const Image = props => (
  <StaticQuery
    query={graphql`
      query {
        placeholderImage: file(relativePath: { eq: "gatsby-astronaut.png" }) {
          childImageSharp {
            fluid(maxWidth: 300) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `}
    render={data => <Img fluid={data.placeholderImage.childImageSharp.fluid} />}
  />
)

export default Image
