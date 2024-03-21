class ApiResponse{
    constructor(statuscode,data,message='message'){
             this.statuscode=statuscode,
             this.data=data,
             this.message = message,
             this.success = statuscode < 400
    }
}