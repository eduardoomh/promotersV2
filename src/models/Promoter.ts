import mongoose, { Schema, Document, ObjectId, Model } from 'mongoose'

export interface IPromoterSchema extends Document {
    _id: string;
    user: string;
    personal_info: {
        name: string;
        last_name: string;
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
        name: {
            type: String,
            required: true,
        },
        last_name: {
            type: String,
            required: true,
        },
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
