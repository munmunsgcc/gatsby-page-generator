import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../components/layout'
import styled from 'styled-components'

export default ({ data }) => {
  const md = data.allMarkdownRemark
  const Container = styled.div`
    display: flex;
    flex-direct: row;
    justify-content: space-around;
  `
  const Excerpt = styled.div`
    width: 30%;
    padding: 10px;
    height: 200px;
    background-color: #fbe5e5;
    position: relative;
    border: 1px solid #000;
  `
  const SeeMore = styled(props => <Link {...props} />)`
    position: absolute;
    bottom: 10px;
    right: 10px;
  `

  return (
    <Layout>
      <Container>
        {md.edges.map(({ node }) => {
          return (
            <Excerpt>
              <h3>{node.frontmatter.title}</h3>
              <div>{node.excerpt}</div>
              <SeeMore to={node.fields.slug}>>> See More</SeeMore>
            </Excerpt>
          )
        })}
      </Container>
    </Layout>
  )
}

export const listQuery = graphql`
  query {
    allMarkdownRemark {
      edges {
        node {
          excerpt
          frontmatter {
            title
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
