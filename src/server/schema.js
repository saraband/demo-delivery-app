import { makeExecutableSchema } from 'graphql-tools';
import db from './models';
import worldCities from './data/world-cities';
import { Op } from 'sequelize';
import GraphQLJSON from 'graphql-type-json';

const typeDefs = `
  scalar JSON
  
  type Restaurant {
    id: ID!
    name: String!
    rating: Int!
    products: [Product!]
    phone: String
    address: String
    thumbnail: String!
    opening_hours: JSON
    imageUrl: String!
  }
  
  type Product {
    id: ID!
    name: String!
    price: Int!
    restaurant: Restaurant!
    description: String,
    ingredients: [String]
  }
  
  type City {
    id: ID!
    name: String!
    country: String!
  }
  
  type Query {
    restaurantsList (offset: Int, limit: Int): [Restaurant!]
    restaurant (id: ID): Restaurant
    productsList (restaurantId: ID): [Product]
    product (id: ID): Product
    citiesList (name: String): [City]
  }
  
  type schema {
    query: Query
  }
`;

const resolvers = {
  JSON: GraphQLJSON,
  Restaurant: {
    imageUrl: (restaurant) => restaurant.image_url,
    products: (restaurant) => restaurant.getProducts()
  },
  Product: {
    restaurant: (product) => product.getRestaurant()
  },
  City: {
    id: (city) => city.geonameid
  },
  Query: {
    citiesList: (_, { name }) => {
      const then = Date.now();
      const filtered = worldCities.filter(city => {
        return city.name.toLowerCase().includes(name.toLowerCase());
      }).slice(0, 5);
      console.log('Searching for \'' + name + '\' took ' + (Date.now() - then) / 1000 + 'ms');
      return filtered;
    },
    restaurant: (_, { id }) => db.restaurant.findOne({
      where: {
        id: {
          [Op.eq]: id
        }
      }
    }),
    product: (_, { id }) => db.restaurant.findOne({
      where: {
        id: {
          [Op.eq]: id
        }
      }
    }),
    restaurantsList: (_, { offset, limit }) => db.restaurant.findAll({ offset, limit }),
    productsList: (_, { restaurantId }) => db.product.findAll({
      where: {
        restaurantId: {
          [Op.eq]: restaurantId
        }
      }
    })
  }
};

export default makeExecutableSchema({
  typeDefs,
  resolvers
});