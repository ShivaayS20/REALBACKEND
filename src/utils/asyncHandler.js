const asyncHandler=(requestHandler)=>{             //METHOD 1 MAINLY USE FOR PRODCUTION GRADE LEVEL
   return (req,res,next)=>{
        Promise.resolve(requestHandler(req,res,next)).catch((err)=>next(err))
    }

}


export {asyncHandler}


//const asynchandler=(fn)=>async(req, res, next)=>{             //METHOD 2
  //  try {
    //    await fn(req, res, next)

  //  } catch (error) {
    //    res.status(err.code || 500).json({
    //        success: false,
      //      message: err.message
        //})
 //   }
// }