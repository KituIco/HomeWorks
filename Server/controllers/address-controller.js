class AddressController{
    constructor(
        addressRepo,
        clientErrors,
        serverErrors,
        addressValidator = null,
        nanoid
    ) {
        this.addressRepo = addressRepo;
        this.clientErrors = clientErrors;
        this.serverErrors = serverErrors;
        this.addressValidator = addressValidator;
        this.nanoid = nanoid;
    }

    // POST: "" && need middleware to validate if user is logged in
    createAddress = async(req, res) => {
        try {
            let {
                userID,
                userFullName,
                userNum,
                region,
                province,
                city,
                barangay,
                postalCode,
                streetName,
                unitNum,
                isDefault
            } = req.body;

            // TODO: Validations
                // Validate if necessary fields are not null
                // Validate if userID exists in database
            
            let addressID = this.nanoid.nanoid(14);

            await this.addressRepo.createAddress(
                addressID,
                userID,
                userFullName,
                userNum,
                region,
                province,
                city,
                barangay,
                postalCode,
                streetName,
                unitNum,
                isDefault
            );

            if (isDefault == 1) {
                await this.addressRepo.setAddressDefault(addressID, userID);
            }

            let newAddress = {
                ...req.body
            }
            newAddress.addressID = addressID;

            res.status(201).json({
                message: 'Address created successfully',
                body: newAddress
            });
        } catch (error) {
            //TODO: Handle error
            console.log(error);
        }
    };

    // PATCH: "/:addressID" && need middleware to validate if user is logged in
    patchAddress = async(req, res) => {
        try {
            let {
                userID,
                userFullName,
                userNum,
                region,
                province,
                city,
                barangay,
                postalCode,
                streetName,
                unitNum,
                isDefault
            } = req.body;

            let { addressID } = req.params;

            // TODO: Validations
                // Validate if addressID is not null
                // Validate if addressID exists in database
            
            await this.addressRepo.patchAddress(
                addressID,
                userID,
                userFullName,
                userNum,
                region,
                province,
                city,
                barangay,
                postalCode,
                streetName,
                unitNum,
                isDefault
            );

            if (isDefault == 1) {
                await this.addressRepo.setAddressDefault(addressID, userID);
            }

            let updatedAddress = {
                ...req.body
            }
            updatedAddress.addressID = addressID;

            res.status(200).json({
                message: 'Address updated successfully',
                body: updatedAddress
            });
        } catch (error) {
            //TODO: Handle error
            console.log(error);
        }
    };
    
    // DELETE: "/:addressID" && need middleware to validate if user is logged in
    deleteAddress = async(req, res) => {
        try {
            let { addressID } = req.params;

            // TODO: Validations
                // Validate if addressID is not null
                // Validate if addressID exists in database

            await this.addressRepo.deleteAddress(addressID);

            res.status(204)
        } catch (error) {
            //TODO: Handle error
            console.log(error);
        }
    };

    // GET: ""
    getAllAddress = async(req, res) => {
        try {
            let addresses = await this.addressRepo.getAllAddress();

            // TODO: Validations

            res.status(200).json({
                message: 'Addresses retrieved successfully',
                body: addresses
            });
        } catch (error) {
            //TODO: Handle error
            console.log(error);
        }
    };

    // GET: "/user/:userID"
    getAllAddressOfUser = async(req, res) => {
        try {
            let { userID } = req.params;

            // TODO: Validations
                // Validate if userID is not null
                // Validate if userID exists in database

            let addresses = await this.addressRepo.getAllAddressOfUser(userID);

            res.status(200).json({
                message: `Addresses of user ${userID} retrieved successfully`,
                body: addresses
            });
        } catch (error) { 
            //TODO: Handle error
            console.log(error);
        }
    };

    // GET: "/:addressID"
    getAddressByID = async(req, res) => {
        try {
            let { addressID } = req.params;

            // TODO: Pre-query Validations
                // Validate if addressID is not null
                
            let address = await this.addressRepo.getAddressByID(addressID);

            // TODO: Post-query Validations
                // Validate if addressID exists in database

            res.status(200).json({
                message: 'Address retrieved successfully',
                body: address
            });
        } catch (error) {
            //TODO: Handle error
            console.log(error);
        }
    };
}

module.exports = AddressController;