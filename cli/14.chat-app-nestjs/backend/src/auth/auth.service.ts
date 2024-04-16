import { BadGatewayException, BadRequestException, Injectable } from '@nestjs/common';
import { SignupUserDto } from 'src/dto/auth/signup-user.dto';
import { emailPattern, userModel } from 'src/schema';
import * as bcrypt from "bcrypt"
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { LoginUserDto } from 'src/dto/auth/login-user.dto';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class AuthService {

    constructor(
        private jwtService: JwtService
    ) { }

    async signup(req: Request, res: Response, signupUserDto: SignupUserDto) {

        const { userName, email, password } = signupUserDto

        if (!userName || userName.trim() === "") {
            throw new BadRequestException('userName is required')
        }

        if (!email || email.trim() === "") {
            throw new BadRequestException('email is required')
        }

        if (!emailPattern.test(email.toLowerCase())) {
            throw new BadGatewayException('invalid email')
        }

        if (!password || password.trim() === "") {
            throw new BadRequestException('password is required')
        }

        const isUserExists = await userModel.findOne({ email: email.toLowerCase() }).exec()

        if (isUserExists) {
            throw new BadRequestException('email already taken')
        }

        const isUserNameExists = await userModel.findOne({ userName: userName.toLowerCase() }).exec()

        if (isUserNameExists) {
            throw new BadRequestException('userName already taken')
        }

        const passwordHash = await bcrypt.hash(password, 12)

        const resp = await userModel.create({
            userName: userName.toLowerCase(), email: email.toLowerCase(), password: passwordHash
        })

        const _id = resp?._id

        const hart = await this.jwtService.signAsync({
            userName: userName.toLowerCase(), email: email.toLowerCase(), _id
        })

        return res.send({
            message: "signup successful",
            hart: hart,
            data: {
                userName: userName,
                email: email,
                createdOn: resp.createdOn,
                _id: _id
            }
        })

    }

    async login(req: Request, res: Response, loginUserDto: LoginUserDto) {

        const { email, password } = loginUserDto

        if (!email || email.trim() === "") {
            throw new BadRequestException('email is required')
        }

        if (!emailPattern.test(email.toLowerCase())) {
            throw new BadGatewayException('invalid email')
        }

        if (!password || password.trim() === "") {
            throw new BadRequestException('password is required')
        }

        const user = await userModel.findOne({ email: email.toLowerCase() }).exec()

        if (!user) {
            throw new BadRequestException('email or password incorrect')
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            throw new BadRequestException('email or password incorrect')
        }

        const hart = await this.jwtService.signAsync({
            userName: user.userName.toLowerCase(),
            email: user.email.toLowerCase(),
            _id: user._id
        })

        return res.send({
            message: "login successful",
            hart: hart,
            data: {
                userName: user.userName,
                email: user.email,
                createdOn: user.createdOn,
                _id: user._id
            }
        })

    }

    async logout(req: Request, res: Response) {

        res.clearCookie("hart")

        return res.send({
            message: "logout successfull"
        })

    }

    async getUsers() {
        const resp = await userModel.find().sort({ _id: -1 }).exec()
        return {
            message: "user fetched",
            data: resp
        }
    }

    async getUser(userId: string) {

        if (!userId || userId.trim() === "") {
            throw new BadRequestException('userId not provided')
        }

        if (!isValidObjectId(userId)) {
            throw new BadRequestException('invalid userId')
        }

        const res = await userModel.findById(userId).exec()

        return {
            message: "account fetched",
            data: {
                userName: res.userName.toLowerCase(),
                email: res.email.toLowerCase(),
                createdOn: res.createdOn,
                _id: res._id
            }
        }

    }

}