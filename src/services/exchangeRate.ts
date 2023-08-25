import { Sequelize } from 'sequelize'
import { Currency } from '../models/currency'
import { ExchangeRate, initExchangeRate } from '../models/exchangeRate'

export interface ExchangePayload {
  id: number,
  idCurrency: number,
  rate: number,
}

export const GetExchangeRates = async (): Promise<ExchangeRate[]> => {
	await initExchangeRate()

	const exchangeRates = await ExchangeRate.findAll({
    attributes: [
      'id',
      'idCurrency',
      [Sequelize.col('currency.description'), 'currencyDescription'],
      [Sequelize.col('currency.symbol'), 'currencySymbol'],
      'rate',
    ],
    include: [
      {
        model: Currency,
        attributes: [],
        as: 'currency',
      },
    ],
  })

  if (!exchangeRates?.length) {
    console.log(`There are no exchange rates.`)
    return []
  }

  return exchangeRates
}

export const UpdateExchangeRate = async (payload: ExchangePayload): Promise<ExchangeRate> => {
	await initExchangeRate()

  if (!payload.id) throw new Error('Error updating exchange rate: missing id')
  const exchangeRate = await ExchangeRate.findByPk(payload.id)

  if (!payload.idCurrency || !payload.rate) throw new Error('Error updating wallet: missing currency or rate')
  if (!exchangeRate) throw new Error(`Error updating exchange rate: ${payload?.id}`)

  exchangeRate.idCurrency = payload.idCurrency
  exchangeRate.rate = payload.rate

  const updatedExchangeRate = exchangeRate.save()
  if (!updatedExchangeRate) throw new Error(`Error updating wallet: ${payload?.id}`)

  return updatedExchangeRate
}
