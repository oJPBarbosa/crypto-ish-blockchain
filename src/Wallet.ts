import * as crypto from 'crypto';
import Chain from './Chain';
import Transaction from './Transaction';

export default class Wallet {
  public publicKey: string;
  public privateKey: string;

  constructor() {
    const keypair: crypto.KeyPairSyncResult<string, string> =
      crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048,
        publicKeyEncoding: {
          type: 'spki',
          format: 'pem',
        },
        privateKeyEncoding: {
          type: 'pkcs8',
          format: 'pem',
        },
      });

    this.publicKey = keypair.publicKey;
    this.privateKey = keypair.privateKey;
  }

  sendMoney(amount: number, payeePublicKey: string): Transaction {
    const transaction: Transaction = new Transaction(
      amount,
      this.publicKey,
      payeePublicKey
    );

    const sign: crypto.Sign = crypto.createSign('sha256');
    sign.update(transaction.toString());

    const signature: Buffer = sign.sign(this.privateKey);

    Chain.instance.addBlock(transaction, this.publicKey, signature);

    return transaction;
  }
}
