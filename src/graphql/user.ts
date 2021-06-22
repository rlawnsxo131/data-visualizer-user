import { gql, IResolvers } from 'apollo-server-fastify';

export const typeDef = gql`
  type User @key(fields: "id") {
    id: ID!
    name: String!
  }
  extend type Query {
    user(id: ID!): User
    users: [User]
  }
`;

export const resolvers: IResolvers = {
  User: {},
  Query: {
    user: (parent, args, context, info) => {
      const { id } = args;
      return users.find((v) => v.id === id);
    },
    users: () => {
      return users;
    },
  },
  Mutation: {},
};

const users = [
  {
    id: '1',
    name: 'juntae',
  },
  {
    id: '2',
    name: 'john',
  },
];
