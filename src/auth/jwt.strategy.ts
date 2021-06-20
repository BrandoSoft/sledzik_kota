import {Strategy} from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { validate } from '@babel/types';
import { User } from 'src/user/user.entity';

export interface JwtPayload {
    id: string;
}

function cookieExtractor(req: any): null | string {
    return (req && req.cookies) ? (req.cookies?.jwt ?? null) : null;
}


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: cookieExtractor,
            secretOrKey: 'JSDIA(*DUS(J(UAS(DJA(hf3OIC(ISUDJsod SJUAI*(DUJAKLSDJ9SDjASDJA*(SDUA)OWJKO',
        });
    }

    async validate(payload: JwtPayload, done: (error, user) => void) {
        if(!payload || !payload.id){
            return done(new UnauthorizedException(), false);
        }

        const user = await User.findOne({ currentTokenId: payload.id});
        if (!user){
            return done(new UnauthorizedException(), false);
        }

        done(null, user)
    }
}
