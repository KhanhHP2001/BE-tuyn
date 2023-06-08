import * as bcrypt from 'bcrypt';

export async function hashingPassWord(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    return hash;
}

export async function comparePassword(params: string, hash: string): Promise<boolean> {
    const result = await bcrypt.compareSync(params, hash);
    return result;
};