import * as crypto from 'crypto';
import Transaction from './Transaction';

export default class Block {
  public nonce: number = Math.round(Math.random() * 999999999);

  constructor(
    public previousHash: string,
    public transaction: Transaction,
    public timestamp: number = Date.now()
  ) {}

  get hash(): string {
    const hash: crypto.Hash = crypto.createHash('sha256');
    hash.update(this.toString());

    return hash.digest('hex');
  }

  toString(): string {
    return JSON.stringify(this);
  }
}
