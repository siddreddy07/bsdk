import crypto from "crypto"

const key = Buffer.from(
  process.env.BSDK_ENCRYPTION_KEY!,
  "hex"
)

export function encrypt(value: string) {
  const iv = crypto.randomBytes(12)

  const cipher = crypto.createCipheriv(
    "aes-256-gcm",
    key,
    iv
  )

  const encrypted = Buffer.concat([
    cipher.update(value, "utf8"),
    cipher.final(),
  ])

  const authTag = cipher.getAuthTag()

  return [
    iv.toString("hex"),
    authTag.toString("hex"),
    encrypted.toString("hex"),
  ].join(":")
}


export function decrypt(value: string) {
  const [ivHex, authTagHex, encryptedHex] = value.split(":")

  if (!ivHex || !authTagHex || !encryptedHex) {
    throw new Error("Invalid encrypted value")
  }

  const decipher = crypto.createDecipheriv(
    "aes-256-gcm",
    key,
    Buffer.from(ivHex, "hex")
  )

  decipher.setAuthTag(
    Buffer.from(authTagHex, "hex")
  )

  const decrypted = Buffer.concat([
    decipher.update(
      Buffer.from(encryptedHex, "hex")
    ),
    decipher.final(),
  ])

  return decrypted.toString("utf8")
}