import * as path from 'path'
import { makeSchema } from 'nexus'
import { ApolloServer } from 'apollo-server-micro'
import Cors from 'micro-cors'
import NexusPrismaScalars from 'nexus-prisma/scalars'
import * as Models from '~/lib/graphql'
// import { createContext } from '~/context'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'

const cors = Cors()

const schema = makeSchema({
	types: [NexusPrismaScalars, Models],
	outputs: {
		schema: path.join(process.cwd(), 'generated/schema.graphql'),
		typegen: path.join(process.cwd(), 'generated/index.d.ts')
	}
})

const apolloServer = new ApolloServer({
	schema,
	// context: createContext(),
	plugins: [ApolloServerPluginLandingPageGraphQLPlayground({})]
})
export const config = {
	api: { bodyParser: false }
}

const apolloStart = apolloServer.start()

export default cors(async (req, res) => {
	await apolloStart
	if (req.method === 'OPTIONS') {
		res.end()
		return false
	}

	return apolloServer.createHandler({
		path: '/api/gql'
	})(req, res)
})
