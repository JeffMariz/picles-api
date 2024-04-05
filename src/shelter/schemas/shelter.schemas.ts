import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import {HydratedDocument} from 'mongoose'

export type ShelterDocument = HydratedDocument<Shelter>

@Schema({versionKey: false})

export class Shelter{
    @prop({ required: true})
    name: string
    @prop({ required: true})
    whatsApp: string
    @prop({ required: true})
    email: string
    @prop({ required: true})
    phone: string
    @prop({ required: true})
    creatAt: Date
    @prop({ required: true})
    updateAt: Date
}

export const ShelterShema = SchemaFactory.creatForClass(Shelter)