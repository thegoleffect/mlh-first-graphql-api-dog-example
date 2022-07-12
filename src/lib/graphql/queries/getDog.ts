import { queryField, nonNull, stringArg } from 'nexus'
import { UserInputError } from 'apollo-server-micro'
import { DogModel } from '../models'

const Dogs = {
	Scooby: {
		id: 1,
		updatedAt: '2022-07-08T13:24:19.071Z'
	},
	Lassie: {
		id: 2,
		updatedAt: '2022-07-07T13:24:19.071Z'
	}
}

export const getDogQuery = queryField('getDog', {
	type: DogModel,
	args: {
		name: nonNull(stringArg())
	},
	resolve: async (parent, { name }, ctx) => {
		if (!Dogs[name]) {
			throw new UserInputError(`Dog named ${name} has no record (yet)`)
		}

		return Promise.resolve({
			...Dogs[name],
			name,
			status: {}
		})
	}
})
