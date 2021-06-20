import * as crypto from 'crypto';

export const hashPwd = (p: string) : string =>{

    const hmac = crypto.createHmac('sha512','asdsdfAFGSFD$%T#$T # 3$#% df sdf sdf$@#RFSD SD F$@#@#$R sdfSDF#$@@#$EFSfsHYJUJKUK*&(&^*&^*678678678hdfgsdfgfw$##%T@$#FSDF@$#%' )
    hmac.update(p);

    return hmac.digest('hex');
}
