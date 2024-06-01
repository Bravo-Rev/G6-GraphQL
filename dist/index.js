"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@apollo/server");
const standalone_1 = require("@apollo/server/standalone");
const products_1 = require("./api/products");
const users_1 = require("./api/users");
const typeDefs = `#graphql
  type Rating {
	rate: Float!
	count: Int!
  }

  type Product {
	id: Int!
	title: String!
	price: Float!
	description: String
	category: String
	image: String
	rating: Rating
  }

  type Name {
	firstname: String!
	lastname: String!
  }

  type Geolocation {
	lat: String!
	long: String!
  }

  type Address {
	city: String!
	street: String!
	number: Int!
	zipcode: String!
  }

  type User {
	id: Int!
	email: String!
	username: String!
	password: String!
	name: Name
	phone: String
	address: Address
	geolocation: Geolocation
  }

  type Query {
	products: [Product]
	findProduct(id: Int!): Product
	findProductsByCategory(category: String!): [Product]
	users: [User]
	findUser(email: String!): User
  }

  type Mutation {
	addProduct(title: String!, price: Float!, description: String, category: String, image: String): Product
	updateProduct(id: Int!, title: String, price: Float, description: String, category: String, image: String): Product
	addUser(email: String!, username: String!, password: String!): User
	deleteUser(id: Int!): User
  }
`;
const resolvers = {
    Query: {
        products: () => __awaiter(void 0, void 0, void 0, function* () {
            return yield (0, products_1.getProducts)();
        }),
        findProduct: (root, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { id } = args;
            const products = yield (0, products_1.getProducts)();
            return products.find((product) => product.id === id);
        }),
        findProductsByCategory: (root, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { category } = args;
            const products = yield (0, products_1.getProducts)();
            return products.filter((product) => product.category === category);
        }),
        users: () => __awaiter(void 0, void 0, void 0, function* () {
            return yield (0, users_1.getUsers)();
        }),
        findUser: (root, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { email } = args;
            const users = yield (0, users_1.getUsers)();
            return users.find((user) => user.email === email);
        })
    },
    Mutation: {
        addProduct: (root, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { title, price, description, category, image } = args;
            return yield (0, products_1.addProduct)({ title, price, description, category, image });
        }),
        updateProduct: (root, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { id, title, price, description, category, image } = args;
            return yield (0, products_1.updateProduct)(id, { title, price, description, category, image });
        }),
        addUser: (root, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { email, username, password } = args;
            return yield (0, users_1.addUser)({ email, username, password });
        }),
        deleteUser: (root, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { id } = args;
            return yield (0, users_1.deleteUser)(id);
        })
    }
};
const server = new server_1.ApolloServer({
    typeDefs,
    resolvers
});
(0, standalone_1.startStandaloneServer)(server, {
    listen: { port: 4000 }
}).then(({ url }) => {
    console.log(`🚀  Server ready at: ${url}`);
});
