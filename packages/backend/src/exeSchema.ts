import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';

const typeDefs = require('@vimes/graphql/schema/schema.graphql')

export default makeExecutableSchema({
  typeDefs,
  resolvers
})