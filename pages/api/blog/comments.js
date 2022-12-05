import { GraphQLClient, gql } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
// const graphcmsToken = process.env.GRAPHCMS_TOKEN;

// here we will create a node route to post user comments

export default async function comments(req, res) {
  //   console.log({ graphcmsToken });
  //   const { name, email, slug, comment } = req.body;
  const graphQLClient = new GraphQLClient(graphqlAPI, {
    headers: {
      authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
    },
  });

  // this is a graphql mutation
  // we are attaching all the data to a single slug
  const query = gql`
    mutation CreateComment(
      $name: String!
      $email: String!
      $comment: String!
      $slug: String!
    ) {
      createComment(
        data: {
          name: $name
          email: $email
          comment: $comment
          post: { connect: { slug: $slug } }
        }
      ) {
        id
      }
    }
  `;
  try {
    const result = await graphQLClient.request(query, {
      name: req.body.name,
      email: req.body.email,
      comment: req.body.comment,
      slug: req.body.slug,
    });
    return res.status(200).send(result);
  } catch (error) {
    console.log('error', error);
    return res.status(500).send(error);
  }
}
