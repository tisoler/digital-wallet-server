import {
	CreationOptional,
	DataTypes,
	InferAttributes,
	InferCreationAttributes,
	Model,
} from 'sequelize'
import DataBaseConnection from '../dataBase/sequelizeSingleton'
import { initTransaction, Transaction, } from './transaction'

export class Wallet extends Model<
  InferAttributes<Wallet>,
  InferCreationAttributes<Wallet>
> {
  declare id: CreationOptional<number>
  declare address: string
	declare balance: number
	declare favorite: boolean
}

export const initWallet = async () => {
	const sequelize = await DataBaseConnection.getSequelizeInstance()

	Wallet.init(
		{
			id: {
				type: DataTypes.INTEGER.UNSIGNED,
				autoIncrement: true,
				primaryKey: true
			},
			address: {
				type: new DataTypes.STRING(250),
				allowNull: false
			},
			balance: {
				type: DataTypes.NUMBER,
				allowNull: false
			},
			favorite: {
				type: DataTypes.BOOLEAN,
				allowNull: false
			}
		},
		{
			sequelize,
			tableName: 'wallet',
			timestamps: false
		}
	)

	await initTransaction()

	if (!Wallet.associations['transactions']) Wallet.hasMany(Transaction, { sourceKey: 'id', foreignKey: 'idWallet', as: 'transactions' })
}
