import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { getProducts, addProduct, updateProduct } from './api/products';
import { getUsers, addUser, deleteUser } from './api/users';

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
		products: async () => {
			return await getProducts();
		},
		findProduct: async (root: any, args: { id: number }) => {
			const { id } = args;
			const products = await getProducts();
			return products.find((product: { id: number }) => product.id === id);
		},
		findProductsByCategory: async (root: any, args: { category: string }) => {
			const { category } = args;
			const products = await getProducts();
			return products.filter((product: { category: string }) => product.category === category);
		},
		users: async () => {
			return await getUsers();
		},
		findUser: async (root: any, args: { email: string }) => {
			const { email } = args;
			const users = await getUsers();
			return users.find((user: { email: string }) => user.email === email);
		}
	},
	Mutation: {
		addProduct: async (
			root: any,
			args: { title: string; price: number; description: string; category: string; image: string }
		) => {
			const { title, price, description, category, image } = args;
			return await addProduct({ title, price, description, category, image });
		},
		updateProduct: async (
			root: any,
			args: { id: number; title: string; price: number; description: string; category: string; image: string }
		) => {
			const { id, title, price, description, category, image } = args;
			return await updateProduct(id, { title, price, description, category, image });
		},
		addUser: async (root: any, args: { email: string; username: string; password: string }) => {
			const { email, username, password } = args;
			return await addUser({ email, username, password });
		},
		deleteUser: async (root: any, args: { id: number }) => {
			const { id } = args;
			return await deleteUser(id);
		}
	}
};

const server = new ApolloServer({
	typeDefs,
	resolvers
});

startStandaloneServer(server, {
	listen: { port: 4000 }
}).then(({ url }) => {
	console.log(`🚀  Server ready at: ${url}`);
});
