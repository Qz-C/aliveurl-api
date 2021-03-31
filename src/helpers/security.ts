const bcrypt = require("bcrypt");

export const hash = async (password:String):Promise<string> => {
    return (await bcrypt.hash(password, 10));
}
