import { Sequelize, } from 'sequelize'
import { Wallet, initWallet, } from '../models/wallet'
import { Transaction } from '../models/transaction'

export interface WalletPayload {
  id?: number,
  address: string,
  balance: number,
  favorite: boolean,
}

export const GetWallets = async (): Promise<Wallet[]> => {
	await initWallet()

	const wallets = await Wallet.findAll({
    attributes: [
      'id',
      'address',
      'balance',
      'favorite',
      [Sequelize.literal('CASE WHEN MIN(transactions.datetime) >= 1 THEN true ELSE false END'), 'isOld'],
    ],
    include: [
      {
        model: Transaction,
        attributes: [],
        required: false, // LEFT JOIN
        as: 'transactions',
      },
    ],
    group: ['Wallet.id'],
    order: [['favorite', 'DESC'], ['address', 'ASC']],
  })

  if (!wallets?.length) {
    console.log(`There are no wallets.`)
    return []
  }

  return wallets
}

export const AddWallet = async (payload: WalletPayload): Promise<Wallet> => {
	await initWallet()

  if (!payload.address || !payload.balance) throw new Error('Error creating a wallet: missing address or balance')

	const newWallet = await Wallet.create({
    address: payload.address,
    balance: payload.balance,
    favorite: payload.favorite,
  })
  if (!newWallet) throw new Error(`Error creating a wallet: ${payload?.address}`)

  const createdWallet = newWallet.save()
  if (!createdWallet) throw new Error(`Error creating a wallet: ${payload?.address}`)

  return createdWallet
}

export const UpdateWallet = async (payload: WalletPayload): Promise<Wallet> => {
	await initWallet()

  if (!payload.id) throw new Error('Error updating wallet: missing id')
  const wallet = await Wallet.findByPk(payload.id)

  if (!payload.address || !payload.balance) throw new Error('Error updating wallet: missing address or balance')
  if (!wallet) throw new Error(`Error updating wallet: ${payload?.address}`)

  wallet.balance = payload.balance
  wallet.favorite = payload.favorite

  const updatedWallet = wallet.save()
  if (!updatedWallet) throw new Error(`Error updating wallet: ${payload?.address}`)

  return updatedWallet
}
