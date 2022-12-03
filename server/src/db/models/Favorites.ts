import { Table, Column, Model, ForeignKey } from 'sequelize-typescript';
import { User } from './User';

@Table
export class Favorites extends Model {
    @ForeignKey(() => User)
    @Column
    declare userId: string;

    @Column
    declare mediId: string;
}
