class ApiError extends Error{
constructor(statusCode,message="something went wrong", errors=[],statck=""){
    super(message)
    this.statusCode=statusCode
    this.data=null
    this.message=message
    this.errors=errors
    this,success=false;


if(stack){                                                      //From this line Sir said either leave or learn it from gpt
    this.stack=statck
}
else{
    Error.captureStackTrace(this,this.constructor)
}
}
}

export {ApiError}
