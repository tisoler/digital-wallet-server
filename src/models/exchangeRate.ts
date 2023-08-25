import {
	CreationOptional,
	DataTypes,
	InferAttributes,
	InferCreationAttributes,
	Model,
} from 'sequelize'
import DataBaseConnection from '../dataBase/sequelizeSingleton'
import { Currency, initCurrency } from './currency'

export class ExchangeRate extends Model<
  InferAttributes<ExchangeRate>,
  InferCreationAttributes<ExchangeRate>
> {
  declare id: CreationOptional<number>
  declare idCurrency: number
	declare rate: number
}

export const initExchangeRate = async () => {
	const sequelize = await DataBaseConnection.getSequelizeInstance()

	ExchangeRate.init(
		{
			id: {
				type: DataTypes.INTEGER.UNSIGNED,
				autoIncrement: true,
				primaryKey: true
			},
			idCurrency: {
				type: DataTypes.NUMBER,
				allowNull: false
			},
			rate: {
				type: DataTypes.NUMBER,
				allowNull: false
			},
		},
		{
			sequelize,
			tableName: 'exchange_rate',
			timestamps: false
		}
	)

	await initCurrency()

	ExchangeRate.hasOne(Currency, { sourceKey: 'idCurrency', foreignKey: 'id', as: 'currency' })
}
