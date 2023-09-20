import mongoose, { Schema, Document, ObjectId, Model } from 'mongoose'
import { IUserSchema } from './User';

export interface IPromoterSchema extends Document {
    _id: string;
    user: string | IUserSchema;
    personal_info: {
        phone: string;
        mobile_phone: string;
        rfc: string;
    },
    address: {
        street: string;
        postal_code: string;
        district: string;
        state: string;
        country: string;
    }
    balance: number;
    type: 'promoter'
    made_by?:  string | IUserSchema;
    created_at: string;
    updated_at: string;
}

const promoterSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    personal_info: {
        phone: {
            type: String,
            required: true,
        },
        mobile_phone: {
            type: String,
            required: true,
        },
        rfc: {
            type: String,
            required: true,
        },
    },
    address: {
        street: {
            type: String,
            required: true,
        },
        postal_code: {
            type: String,
            required: true,
        },
        district: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
    },
    balance: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        enum: {
            values: ['active', 'inactive'],
            message: '{VALUE} no es un estado permitido'
        },
        default: 'pending'
    },
    made_by: {
        type: Schema.Types.ObjectId,
        ref: "User",
        rquired: false
    },
    created_at: {
        type: Schema.Types.Date,
        default: Date.now
    },
    updated_at: {
        type: Schema.Types.Date,
        default: Date.now
    },
});


const PromoterModel: Model<IPromoterSchema> = mongoose.models.Promoter || mongoose.model('Promoter', promoterSchema)
export default PromoterModel

