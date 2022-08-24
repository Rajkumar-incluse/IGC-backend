// if there is error in user input (req.body)
class RequestInputError extends Error{
    constructor({ code = 400, message }) {
        super(message);
        this.name = "RequestInputError";
        this.code = code
      }
}

// if resourcce or object alredy exists
class ObjectExistsError extends Error{
    constructor({code = 409, message }) {
        super(message);
        this.name = "ObjectExistsError";
        this.code = code
      }
}

class CustomError extends Error{
    constructor({ code = 422, message }){
        super(message)
        this.name = "CustomeError"
        this.code = code
    }
}

exports.HandleResponseError = function(err, res){
    if(err instanceof RequestInputError){
        return res.status(err.code).json({ errors: [{ msg: err.message }] })
    }
    console.log(err)
    res.status(500).json({ errors: [{ msg: "Internal server error" }] })
}

exports.RequestInputError = RequestInputError
exports.ObjectExistsError = ObjectExistsError
exports.CustomError = CustomError