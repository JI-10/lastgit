import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2'
const UUID = require("uuid")
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

@Injectable({})
export class AuthService {
    constructor(private prisma: PrismaService) { }
    async signup(dto: AuthDto) {
        try {
            //generate password hash
            const hash = await argon.hash(dto.password)

            //save it in our db
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    hash,
                    
                },
            })
            //return the saved user
            delete user.hash;
            return user;
        } catch(error)
        {
            if(error instanceof PrismaClientKnownRequestError){
                if(error.code=='P2002'){
                    throw new ForbiddenException(
                        'Credentials already used.'
                    )
                }
                else throw error
            }
        }
        
    }

    async signin(dto: AuthDto) {
        //get email and password
        //search for user in db useing email
        const user = await this.prisma.user.findUnique({
            where:{
                email:dto.email,
            },
        })
        if(!user) throw new ForbiddenException('Credentials incorrect.')
        else{
            const ifPasswordCorrect = await  argon.verify(user.hash,dto.password)
            if(ifPasswordCorrect){
                delete user.hash
                return user;
            }
            else{
                throw new ForbiddenException("Password didn't match")
            }
        }
        //compare passwords
        //throw error if passwords dont match
        //else return user
    }
}