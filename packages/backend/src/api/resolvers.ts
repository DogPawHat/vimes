import { find, filter } from 'ramda';

import User from '../models/User';
import Post from '../models/Post';
import PostsByAuthor from '../models/PostsByAuthor';

import {
  IResolverObject, IResolvers, IFieldResolver
} from 'graphql-tools/dist/Interfaces';

const resolvers: IResolvers = {
  Query: {
    user: (
      root = {},
      args,
      context
    ) => User.gen(context.viewer, args.id)
  },
  User: {
    posts: (
      user,
      _,
      context
    ) => PostsByAuthor.gen(context.viewer, user.id)
  },
  Post: {
    author: (
      post,
      _,
      context
    ) => User.gen(context.viewer, post.authorId)
  }
}

export default resolvers;