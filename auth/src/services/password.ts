import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt);

export class Password {
  static async toHash(password: string) {
    const salt = randomBytes(8).toString("hex");
    const buf = (await scryptAsync(password, salt, 64)) as Buffer;
    return `${buf.toString("hex")}.${salt}`;
  }

  static async compare(storedPasswordHash: string, suppliedPassword: string) {
    const [hashedPassword, salt] = storedPasswordHash.split(".");
    if (!salt || !hashedPassword) {
      throw new Error("Invalid password hash format");
    }
    const buf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;

    return buf.toString("hex") === hashedPassword;
  }
}
