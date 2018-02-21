import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';

const typeDefs = require('./schema.graphql')

export default makeExecutableSchema({
  typeDefs,
  resolvers
})