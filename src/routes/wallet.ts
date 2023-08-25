import { Response, Request } from 'express'
import { AddWallet, GetWallets, UpdateWallet, WalletPayload, } from '../services/wallet'

export const RouteGetWallets = async (req: Request, res: Response) => {
  try {
    const wallets = await GetWallets()
    res.status(200).json(wallets)
  } catch(e) {
    console.log(e)
    res.status(400).send(e)
  }
}

export const RouteAddWallet = async (req: Request, res: Response) => {
  try {
    if (!req.body) {
      res.sendStatus(400)
      return
    }
    const wallet = await AddWallet(req.body as WalletPayload)

    res.status(200).json(wallet)
  } catch(e) {
    console.log(e)
    res.status(400).send(e)
  }
}

export const RouteUpdateWallet = async (req: Request, res: Response) => {
  try {
    if (!req.body) {
      res.sendStatus(400)
      return
    }
    const wallet = await UpdateWallet(req.body as WalletPayload)

    res.status(200).json(wallet)
  } catch(e) {
    console.log(e)
    res.status(400).send(e)
  }
}
