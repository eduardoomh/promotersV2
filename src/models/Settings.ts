import mongoose, { Model, Schema, Document } from 'mongoose'

export interface ISettingSchema extends Document {
    _id: string;
    woo_keys: {
        client_id: string;
        client_secret: string;
        store_url: string;
    }
}

const SettingSchema = new mongoose.Schema({
    woo_keys: {
        client_id:{
            type: String,
            required: true
        },
        client_secret:{
            type: String,
            required: true
        },
        store_url:{
            type: String,
            required: true
        }
    }
})

const SettingsModel: Model<ISettingSchema> = mongoose.models.Setting || mongoose.model('Setting', SettingSchema)
export default SettingsModel