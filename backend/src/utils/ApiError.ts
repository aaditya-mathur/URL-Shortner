class ApiError extends Error {
    statusCode : number;
    data : null ;
    errors : Array<object> ;
    message : string = "something went wrong";
    success : boolean;
    stack?: string | undefined;

    constructor(statusCode : number, message : string = "something went wrong",errors : Array<object> = [] , data : null = null,stack? : string | undefined)
    {
        super(message);
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = false;
        this.errors = errors;
        
        if(stack)
        {
            this.stack = stack;
        }
        else
        {
            Error.captureStackTrace(this,this.constructor)
        }
    }
}

export { ApiError };