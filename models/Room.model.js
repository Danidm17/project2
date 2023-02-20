const { Schema, model } = require('mongoose')

const roomSchema = new Schema({
    name: {
        type: String
    },
    type: {
        type: String,
        enum: ['Couch', 'Single  Room', 'Double Room']
    },
    profileImg: {
        type: String,
        default: 'https://freesvg.org/img/lanti-Apartment-Symbol-pictogram-1.png'
    },
    description: {
        type: String
    },
    location: {
        type: {
            type: String
        },
        coordinates: [Number]
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
},
    {
        timestamps: true
    }
)

roomSchema.index({ location: '2dsphere' })

const Room = model('Room', roomSchema)

module.exports = Room