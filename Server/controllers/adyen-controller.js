class AdyenController {
    constructor(
        checkout,
        clientErrors,
        adyenValidator,
        paymentTransactionRepo,
        nanoid
    ) {
        this.checkout = checkout;
        this.clientErrors = clientErrors;
        this.adyenValidator = adyenValidator;
        this.paymentTransactionRepo = paymentTransactionRepo;
        this.nanoid = nanoid;
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
            next(error);
        }
    };

    // Post: "/payments"
    makePayment = async (req, res, next) => {
        try {
            let {cntryCode, crncy, val} = req.query;
            let {paymentMethod, returnUrl} = req.body;

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

            res.status(200).json({
                message: "Payment methods retrieved successfully",
                body: paymentsResponse
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = AdyenController;