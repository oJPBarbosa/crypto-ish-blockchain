import * as crypto from 'crypto';
import Block from './Block';
import Transaction from './Transaction';

export default class Chain {
  public static instance = new Chain();

  chain: Block[];

  constructor() {
    this.chain = [new Block('', new Transaction(0, '', ''))];
  }

  get lastBlock(): Block {
    return this.chain[this.chain.length - 1];
  }

  mine(nonce: number): void {
    console.log('⛏️  Mining...');

    let solution = 0;
    let mining = true;
    while (mining) {
      const hash = crypto.createHash('sha256');
      hash.update((nonce + solution).toString());

      const attempt = hash.digest('hex');
      console.log('🔗', attempt);

      if (attempt.startsWith('00000')) {
        console.log(
          `\n🎉 Mined!\n\tAttempt: ${attempt}\n\tSolution: ${solution + 1}\n`
        );
        mining = false;
      }

      solution++;
    }
  }

  addBlock(
    transaction: Transaction,
    senderPublicKey: string,
    signature: Buffer
  ): void {
    const verifier = crypto.createVerify('sha256');
    verifier.update(transaction.toString());

    const isValid = verifier.verify(senderPublicKey, signature);

    if (isValid) {
      const block = new Block(this.lastBlock.hash, transaction);
      this.mine(block.nonce);
      this.chain.push(block);
    }
  }
}
