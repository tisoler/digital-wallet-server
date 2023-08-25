import { Response, Request } from 'express'
import { ExchangePayload, GetExchangeRates, UpdateExchangeRate } from '../services/exchangeRate'

export const RouteGetExchangeRates = async (req: Request, res: Response) => {
  try {
    const exchangeRates = await GetExchangeRates()
    res.status(200).json(exchangeRates)
  } catch(e) {
    console.log(e)
    res.status(400).send(e)
  }
}

export const RouteUpdateExchangeRate = async (req: Request, res: Response) => {
  try {
    if (!req.body) {
      res.sendStatus(400)
      return
    }
    const exchangeRate = await UpdateExchangeRate(req.body as ExchangePayload)

    res.status(200).json(exchangeRate)
  } catch(e) {
    console.log(e)
    res.status(400).send(e)
  }
}
