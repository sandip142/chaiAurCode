class ApiError extends Error{
    constructor(
        statuscode,
        message="something went wrong",
        stack="",
        errors=[]
    ){
       super(message),
       this.statuscode=statuscode,
       this.errors=errors,
       this.success=false,
       this.message=message,
       this.data=null,
       this.stack=stack
    }
}