class AdminController{
    constructor(
        userRepo,
        adminRepo,
        credentialsRepo,
        clientErrors,
        serverErrors,
        adminValidator = null,
        nanoid
    ) {
        this.userRepo = userRepo;
        this.adminRepo = adminRepo;
        this.credentialsRepo = credentialsRepo;
        this.clientErrors = clientErrors;
        this.serverErrors = serverErrors;
        this.adminValidator = adminValidator;
        this.nanoid = nanoid;
    }

    createAdmin = async(req, res) => {
        try {
            let {
                identifier,
                password
            } = req.body;
            // TODO: Pre-query validations
                // Validate if necessary fields are not null
                // Validate if identifier exists in database
                // Validate if identifier follows either the username or email or phone num format
                // Validate if password follows the password format
        }catch(error){
            //TODO: Handle error
            console.log(error);
        }
    };
}

module.exports = AdminController;