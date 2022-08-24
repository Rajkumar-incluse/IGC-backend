class RequestInputError extends Error{
    constructor(obj) {
        super(obj.message);
        this.name = "RequestInputError";
        this.code = obj.code
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