import { objectType } from 'nexus'
import { formatDistance } from 'date-fns'

// simulating status as a third-party api separate from main DogModel
const DOG_STATUSES = {
	Scooby: {
		hasHat: true,
		isHungry: true,
		hasToPoo: true
	},
	Lassie: {
		hasHat: false,
		isHungry: true,
		hasToPoo: false
	}
}

export const DogStatus = objectType({
	name: 'DogStatus',
	description: 'Dog Status (hungry, hasToPoo, hasHat)',
	definition(t) {
		t.field('hasHat', {
			type: 'Boolean'
		})
		t.field('isHungry', {
			type: 'Boolean'
		})
		t.field('hasToPoo', {
			type: 'Boolean'
		})
	}
})

export const DogModel = objectType({
	name: 'Dog',
	description: 'Dog 🐕',
	definition(t) {
		t.field('id', {
			type: 'Int'
		})
		t.field('name', {
			type: 'String'
		})
		t.field('status', {
			type: DogStatus,
			async resolve(parent, args, context) {
				if (!DOG_STATUSES[parent.name]) {
					return Promise.resolve({
						hasHat: false,
						isHungry: false,
						hasToPoo: false
					})
				}

				return Promise.resolve(DOG_STATUSES[parent.name])
			}
		})
		t.field('updatedAt', {
			type: 'String',
			resolve(parent, args, context) {
				return formatDistance(new Date(parent.updatedAt), new Date(), {
					addSuffix: true
				})
			}
		})
	}
})
