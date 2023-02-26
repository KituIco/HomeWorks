class UserController {
    constructor(
        userRepo,
        clientErrors,
        serverErrors,
        userValidator = null,
        nanoid
    ) { 
        this.userRepo = userRepo;
        this.clientErrors = clientErrors;
        this.serverErrors = serverErrors;
        this.userValidator = userValidator;
        this.nanoid = nanoid;
    }
}

module.exports = UserController;