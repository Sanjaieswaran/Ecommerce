import mongoose, { Document, Schema } from 'mongoose';

export interface IItem extends Document {
    name: string;
    description: string;
    price: number;
}

const ItemSchema: Schema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true }
});

const Item = mongoose.model<IItem>('Item', ItemSchema);

export default Item;