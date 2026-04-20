import Cryptr from "cryptr"

const cryptr = new Cryptr(process.env.ENCRYPTION_KEY!)

export function encrypt(text: string): string {
  return cryptr.encrypt(text)
}

export function decrypt(encrypted: string): string {
  return cryptr.decrypt(encrypted)
}
