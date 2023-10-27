import mongoose, { Schema, Document, Model } from 'mongoose'
import { IUserSchema } from './User';
import { IPromoterSchema } from './Promoter';
import { ICommissionSchema } from './Comissions';

export interface IMovementSchema extends Document {
    _id: string;
    user: string | IUserSchema;
    promoter: string | IPromoterSchema;
    amount: number;
    type: 'discount' | 'payment',
    security: {
        before_mod: number;
        after_mod: number;
    }
    commission?: string | ICommissionSchema;
    description: string;
    made_by?: string | IUserSchema;
    created_at: number;
    updated_at: number;
}


const movementSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    promoter: {
        type: Schema.Types.ObjectId,
        ref: "Promoter",
        required: true
    },
    amount: {
        type: Number
    },
    description: {
        type: String
    },
    type: {
        type: String,
        enum: {
            values: ['discount', 'payment'],
            message: '{VALUE} no es un tipo de pago permitido'
        },
        required: true
    },
    security:{
        before_mod:{
            type: Number
        },
        after_mod: {
            type: Number
        }
    },
    commission: {
        type: Schema.Types.ObjectId,
        ref: "Commission",
        required: false 
    },
    made_by: {
        type: Schema.Types.ObjectId,
        ref: "User",
        rquired: true
    },
    created_at: {
        type: Schema.Types.Date,
        default: Date.now
    },
    updated_at: {
        type: Schema.Types.Date,
        default: Date.now
    },
})

const MovementModel: Model<IMovementSchema> = mongoose.models.Movement || mongoose.model('Movement', movementSchema)
export default MovementModel