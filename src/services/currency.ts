
import { Currency, initCurrency } from '../models/currency'

export const GetCurrencies = async (): Promise<Currency[]> => {
	await initCurrency()

	const currencies = await Currency.findAll({
    where: { active: true }
  })

  if (!currencies?.length) {
    console.log(`There are no currencies.`)
    return []
  }

  return currencies
}
