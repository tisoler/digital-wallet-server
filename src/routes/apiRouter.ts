
import express, { Router } from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'
import { RouteAddWallet, RouteGetWallets, RouteUpdateWallet } from './wallet'
import { RouteGetCurrencies } from './currency'
import { RouteGetExchangeRates, RouteUpdateExchangeRate } from './exchangeRates'

const apiRouter: Router = express.Router()

// --- Swagger ---//
// Dynamic Swagger documentation
const options = {
	definition: {
	  openapi: '3.0.0',
	  info: {
			title: 'Subscriptions API',
			version: '1.0.0',
			license: {
				name: "MIT"
			}
	  },
	},
	apis: ['./src/routes/apiRouter.ts', './routes/apiRouter.js'],
}

const openapiSpecification = swaggerJsdoc(options)

apiRouter.use('/docs', swaggerUi.serve);
apiRouter.get('/docs', swaggerUi.setup(openapiSpecification))

// --- Routes --- //

/**
 * @openapi
 * api/wallet:
 *    get:
 *     description: List of wallets
 *     tags:
 *       - wallet
 *     responses:
 *       200:
 *         description: Retrieves a list of all wallets.
*/

apiRouter.get('/wallet', RouteGetWallets)


/**
 * @openapi
 * api/wallet:
 *    post:
 *     description: Insert a wallet
 *     tags:
 *       - wallet
 *     requestBody:
 *      required: true
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            properties:
 *              address:
 *                type: string
 *              balance:
 *                type: number
 *              favorite:
 *                type: boolean
 *            required:
 *              - address
 *              - balance
 *    responses:
 *      200:
 *        description: Created wallet.
*/

apiRouter.post('/wallet', RouteAddWallet)


/**
 * @openapi
 * api/wallet:
 *    put:
 *     description: Update a wallet
 *     tags:
 *       - wallet
 *     requestBody:
 *      required: true
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            properties:
 *              id:
 *                type: integer
 *              address:
 *                type: string
 *              balance:
 *                type: number
 *              favorite:
 *                type: boolean
 *            required:
 *              - id
 *              - address
 *              - balance
 *    responses:
 *      200:
 *        description: Updated wallet.
*/

apiRouter.put('/wallet', RouteUpdateWallet)


/**
 * @openapi
 * api/currency:
 *    get:
 *     description: List of currencies
 *     tags:
 *       - currency
 *     responses:
 *       200:
 *         description: Retrieves a list of currencies.
*/

apiRouter.get('/currency', RouteGetCurrencies)


/**
 * @openapi
 * api/exchangerates:
 *    get:
 *     description: List of exchange rates
 *     tags:
 *       - exchangerate
 *     responses:
 *       200:
 *         description: Retrieves a list of exchange rates.
*/

apiRouter.get('/exchangerate', RouteGetExchangeRates)


/**
 * @openapi
 * api/exchangerate:
 *    put:
 *     description: Update exchange rate
 *     tags:
 *       - exchangerate
 *     requestBody:
 *      required: true
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            properties:
 *              id:
 *                type: integer
 *              idCurrency:
 *                type: integer
 *              rate:
 *                type: number
 *            required:
 *              - id
 *              - idCurrency
 *              - rate
 *    responses:
 *      200:
 *        description: Updated exchange rate.
*/

apiRouter.put('/exchangerate', RouteUpdateExchangeRate)

export default apiRouter
