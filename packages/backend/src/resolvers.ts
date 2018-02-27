import { find, filter } from 'ramda';

import {
  IResolverObject, IResolvers, IFieldResolver
} from 'graphql-tools/dist/Interfaces';

const authors = [
  { id: 1, firstName: 'Tom', lastName: 'Coleman' },
  { id: 2, firstName: 'Sashko', lastName: 'Stubailo' },
  { id: 3, firstName: 'Mikhail', lastName: 'Novikov' },
];

const posts = [
  { id: 1, authorId: 1, title: 'Introduction to GraphQL'},
  { id: 2, authorId: 2, title: 'Welcome to Meteor' },
  { id: 3, authorId: 2, title: 'Advanced GraphQL'},
  { id: 4, authorId: 3, title: 'Launchpad is Cool' },
];

const resolvers: IResolvers = {
  Query: {
    posts: () => posts,
    user: (
      root = {},
      args
    ) => find(a => (a.id === args.id), authors)
  },
  User: {
    posts: (user) => filter(p => user.id === p.authorId, posts)
  },
  Post: {
    author: (post) => find(a => a.id === post.authorId, authors)
  }
}

export default resolvers;