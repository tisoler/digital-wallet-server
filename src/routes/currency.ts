import { Response, Request } from 'express'
import { GetCurrencies, } from '../services/currency'

export const RouteGetCurrencies = async (req: Request, res: Response) => {
  try {
    const currencies = await GetCurrencies()
    res.status(200).json(currencies)
  } catch(e) {
    console.log(e)
    res.status(400).send(e)
  }
}
