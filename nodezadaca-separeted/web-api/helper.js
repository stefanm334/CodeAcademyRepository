emailValidator = (req, res, next) => {
    
    if (req.body.email.length < 5 || req.body.email.includes("@") || req.body.email.includes(".com")) {
        var error = new Error("Invalid email");
        error.status = 400;
        next(error);
    }
    else {
        next();
    }
};

is18OrOlder = (req, res, next) => {
    if (req.body.age < 18) {
        var error = new Error("You must be 18 or older to sign up");
        error.status = 401;
        next(error);
    }
    else {
        next();
    }
};


module.exports = {
    emailValidator,
    is18OrOlder
}