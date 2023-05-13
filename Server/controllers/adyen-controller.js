const dotenv = require("dotenv");
dotenv.config({
    path: "../.env",
});

class AdyenController {
    constructor(
        checkout,
        clientErrors,
        adyenValidator,
        payoutRepo,
        nanoid,
        NodeRSA
    ) {
        this.checkout = checkout;
        this.clientErrors = clientErrors;
        this.adyenValidator = adyenValidator;
        this.payoutRepo = payoutRepo;
        this.nanoid = nanoid;
        this.NodeRSA = NodeRSA;
    }

    // Get: "/paymentMethods"
    getPaymentMethods = async (req, res, next) => {
        try {
            let {cntryCode, crncy, val} = req.query;

            const paymentsResponse = await this.checkout.paymentMethods(
                {
                    merchantAccount: process.env.ADYEN_MERCHANT_ACCOUNT,
                    countryCode: cntryCode,
                    amount: {
                        currency: crncy,
                        value: val
                    }
                }
            )
            
            res.status(200).json({
                message: "Payment methods retrieved successfully",
                body: paymentsResponse
            });
        } catch (error) {
            console.log(error)
            next(error);
        }
    };

    // Post: "/payments"
    makePayment = async (req, res, next) => {
        try {
            let {cntryCode, crncy, val} = req.query;
            let {paymentMethod, returnUrl, providerID, seekerID} = req.body;

            const paymentsResponse = await this.checkout.payments(
                {
                    merchantAccount: process.env.ADYEN_MERCHANT_ACCOUNT,
                    countryCode: cntryCode,
                    amount: {
                        currency: crncy,
                        value: val
                    },
                    reference: "Test payment",
                    paymentMethod: paymentMethod,
                    returnUrl: returnUrl,
                    channel: "Web"
                }
            )

            let paymentID = this.nanoid(14);

            await this.payoutRepo.createPayout(
                paymentID,
                seekerID,
                providerID,
                val,
                Date.now(),
                1
            )

            res.status(200).json({
                message: "Payment methods retrieved successfully",
                body: paymentsResponse
            });
        } catch (error) {
            next(error);
        }
    }

    // POST: '/payout'
    makePayout = async (req, res, next) => {
        try {
            let {crncy, val} = req.query;
            let {cardDetails, payoutID} = req.body;

            const privateKey = process.env.RSA_PRIVATE_KEY;

            const rsa = new this.NodeRSA(privateKey);

            const decryptedCardDetails = JSON.parse(rsa.decrypt(cardDetails, 'utf8'));

            const payoutsResponse = await this.checkout.payouts(
                {
                    merchantAccount: merchantAccount,
                    amount: {
                        currency: crncy,
                        value: val
                    },
                    reference: 'Test payout',
                    card: {
                        cvc : decryptedCardDetails.cvc,
                        expiryMonth : decryptedCardDetails.expiryMonth,
                        expiryYear : decryptedCardDetails.expiryYear,
                        holderName : decryptedCardDetails.holderName,
                        number : decryptedCardDetails.number
                    }
                }
            )

            await this.payoutRepo.patchPayout(
                payoutID,
                null,
                null,
                null,
                null,
                2
            )

            res.status(200).json({
                message: "Payouts retrieved successfully",
                body: payoutsResponse
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = AdyenController;