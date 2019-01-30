// Gatsby has API you can use in Node.
// https://www.gatsbyjs.org/docs/node-apis/

// Note: A node can be any object, and Gatsby's data model centers around
// Note: accessing and manipulating nodes.
// Note: E.g. MarkdownRemark Node, File Node.
// Note: You can console log to see what is in a node.

const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

// API to run whenever a new node is created.
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === 'MarkdownRemark') {
    //createNodeField is used to extend a node's field
    //E.g. Add a field called 'slug'. The slug field is accessible through
    //E.g. the accessing 'fields' key in the Node object.
    createNodeField({
      node,
      name: 'slug',
      //createFilePath slugifies the path to the page
      value: createFilePath({ node, getNode, basePath: 'pages' }),
    })
  }
}

//API to tell Gatsby to add pages
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  //Retrieves all markdown pages with their respective fields.
  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            html
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
  `).then(result => {
    //Loop through the markdown pages and create pages using createPage API.
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      //path -> the path to load the page. Usually a slug.
      //component -> absolute path to the page. Usually we put a template here.
      //context -> What props should we pass to the page? Accessible through
      //this.props.pageContext, and as GraphQL arguments
      createPage({
        path: node.fields.slug,
        component: path.resolve('./src/templates/blog-post.js'),
        context: {
          slug: node.fields.slug,
          world: 'is flat',
        },
      })
    })
  })
}
