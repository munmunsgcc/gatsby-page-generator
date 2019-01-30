import React from 'react'
import { graphql } from 'gatsby'

export default ({ data, pageContext }) => {
  const md = data.markdownRemark

  //To properly set HTML, we need to use React's dangerouslysetinnerhtml.
  return (
    <div>
      <h3>Hello {pageContext.world}</h3>
      <h1>{md.frontmatter.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: md.html }} />
    </div>
  )
}

//1. Declare the data type of the $slug variable.
//2. Get markdown with fields equivalent to the given slug passed from
//createPages API.
//3. The markdown retrieved should return html, and the title from the
//markdown's frontmatter.
export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`
