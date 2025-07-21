import { asyncHandler } from "../utils/asynchandler.js"
import { ApiError } from "../utils/Apierror.js"
import { User } from "../models/user.model.js"  //iske import ka reason iski file me hai
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"

const registerUser = asyncHandler(async(req,res)=>{
  //STEPS TO REGISTER USER

  //get user details from frontend like id,pass,avatar(whatever you make in model.js)
  //validation like details fully filled,or any field not missed ,etc
  //check if user already exist: NOTE:can be check by unique component like username ,email
  //check for images,check for avatar
  //if available upload them on cloudinary, avatar check
  //create user object(in mongo db we sent object), create entry in db
  //remove password and refresh token field from response(momgo db me jub nta hai to as it is saara response aa jata hai thats why req aayi thi abh response de rhe ho user ko to usse password or refresh token nhi dena hai)
  //checck for user creation
  //if created return response else error message 

  //STEP-1
  const {fullname,email,username,password} = req.body //we only getting the data not the files like avatar, image
  console.log("email: ",email)


  //STEP-2

 //METHOD-1(do seperately for each)
 // if(fullname===""){
//  throw new ApiError(400,"fullname required")           //here you are putting the values for the constructor present in ApiError.js
//  }



//METHOD-2 (do in single go)
if([fullname,email,username,password].some((fields)=>
field?.trim() === "")
){
    throw new ApiError(400,"All fields are required") 
}    
// we can create more velidations like email me @ hai ki nhi,or fomating theek hai ki nhi,etc


//STEP-3
const existeduser = User.findOne({  
  $or: [{username},{email}]         //iss tareeke se multiple fileds ko ek baar me check krr skate ho
})

if(existeduser){
    throw new ApiError(409,"this username and email already esists")
}


//STEP-4
const avatarlocalpath=req.files?.avatar[0]?.path;
const coverimagelocalpath=req.files?.coverimage[0].path;

if(!avatarlocalpath){
    throw new ApiError9400," Avatar file is required "
}


//STEP-5
const avatar = await uploadOnCloudinary(avatarlocalpath)  //dekho file upload me time lgega to await ki need hai..abh sochoge async knha hai to dekho jub function suru hua tha wnha async dala tha step 1 se phle
const coverimage = await uploadOnCloudinary(coverimagelocalpath)

if(!avatar){
    throw new ApiError9400," Avatar file is required "
}

//STEP-6
const user = await User.create({           //jub bhi data base se baat hongi to error aa sakta hai jo ki handle ho jayega by asynchandler.js but will put await for time
    fullname,
    avatar: avatar.url,
    coverimage: coverimage?.url || "", //ynha ye case isliye hai kyoki surity nhi hai ki url hai bhi ki nhi kyoki hmne local path or coverimage incloudinary check nhi kiya hai
    email,
    password,
    username: username.toLowerCase()
})


//STEP-7
const createdUser = await User.find(user._id).select(
    "-passsword -refreshToken"        //abh createdUser me .find dhoondega id se user ko agrr mil jata hai to uska data aa jayega createdUser me or usme password or refrenceToken nhi aagenge becoz of .select 
)

if(!createdUser){
    throw new ApiError(500,"Something went wrong while registering the user")
}


//STEP-8
return res.status(201).json(
    new ApiResponse(200, createdUser, "User registered successfully")
)

}) 
export {registerUser}