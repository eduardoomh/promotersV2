import mongoose, { Schema, Document, Model } from 'mongoose'
import { IUserSchema } from './User';
import { IPromoterSchema } from './Promoter';

export interface ICommissionSchema extends Document {
    _id: string;
    user: string | IUserSchema;
    promoter: string | IPromoterSchema;
    coupon: {
        id: string;
        code: string;
        products: string[];
    }
    earnings:{
        type: 'percentage' | 'fixed_price';
        amount: number;
    }
    made_by?: string | IUserSchema;
    created_at: number;
    updated_at: number;
}


const commissionSchema = new Schema({
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
    coupon: {
        id: {
            type: String
        },
        code: {
            type: String
        },
        products: [{
            type: String
        }]
    },
    earnings: {
        type: {
            type: String
        },
        amount: {
            type: Number
        },
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
})

const CommissionModel: Model<ICommissionSchema> = mongoose.models.Commission || mongoose.model('Commission', commissionSchema)
export default CommissionModel