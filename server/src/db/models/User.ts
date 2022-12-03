import { Table, Column, Model } from 'sequelize-typescript';

@Table({
    timestamps: true,
})
export class User extends Model {
    @Column
    declare email: string;

    @Column
    declare password: string;
}
