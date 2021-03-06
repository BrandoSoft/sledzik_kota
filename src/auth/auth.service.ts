import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { AuthLoginDto } from './dto/auth-login.dto';
import { User } from 'src/user/user.entity';
import { hashPwd } from 'src/user/utils/hash-pwd';
import { v4 as uuid } from 'uuid';
import { sign } from 'jsonwebtoken';
import { JwtPayload } from './jwt.strategy';

@Injectable()
export class AuthService {
    private static createToken(currentTokenId: string): {accessToken: string, expiresIn: number} {
        const payload: JwtPayload = { id: currentTokenId };
        const expiresIn = 60 * 60 * 24;
        const accessToken = sign(payload, 'JSDIA(*DUS(J(UAS(DJA(hf3OIC(ISUDJsod SJUAI*(DUJAKLSDJ9SDjASDJA*(SDUA)OWJKO', { expiresIn });
        return {
            accessToken,
            expiresIn,
        };
    };

    private async generateToken(user: User): Promise<string> {
        let token;
        let userWithThisToken = null;
        do {
            token = uuid();
            userWithThisToken = await User.findOne({ currentTokenId: token });
        } while (!!userWithThisToken);
        user.currentTokenId = token;
        await user.save();

        return token;
    };

    async login(req: AuthLoginDto, res: Response): Promise<any> {
        try {
            const user = await User.findOne({
                email: req.email,
                pwdHash: hashPwd(req.pwd),
            });

            if (!user) {
                return res.json({error: 'Invalid login data!'});
            }

            const token = await AuthService.createToken(await this.generateToken(user))
            // const token = await AuthService.createToken(await this.generateToken(user));

            return res
                .cookie('jwt', token.accessToken, {
                    secure: false,
                    domain: 'localhost',
                    httpOnly: true,
                })
                .json({ok: true,
                userName: user.name,
                  cookie: token.accessToken}
                  );
        } catch (e) {
            return res.json({error: e.message});
        }
    };

    async logout(user: User, res: Response) {
        try {
            user.currentTokenId = null;
            console.log(res)
            await user.save();
            res.clearCookie(
                'jwt',
                {
                    secure: false,
                    domain: 'localhost',
                    httpOnly: true,
                }
            );
            return res.json({ok: true});
        } catch (e) {
            return res.json({error: e.message});
        }
    }

}

