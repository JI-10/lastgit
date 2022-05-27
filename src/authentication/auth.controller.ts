import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.providers";
import { AuthDto } from "./dto";

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}

    //  auth/signin 
    @Post('signin')
    signin(@Body() dto:AuthDto){
        this.authService.signin(dto)
    }

    // auth/signup
    @Post('signup')
    signup(@Body() dto: AuthDto){
        this.authService.signup(dto)
        
    }


}