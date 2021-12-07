import * as crypto from 'crypto';
import Block from './Block';
import Transaction from './Transaction';

export default class Chain {
  public static instance: Chain = new Chain();
  public chain: Block[];

  constructor() {
    this.chain = [new Block('', new Transaction(0, '', ''))];
  }

  get lastBlock(): Block {
    return this.chain[this.chain.length - 1];
  }

  mine(nonce: number): void {
    console.log('⛏️  Mining...\n');

    let solution: number = 0;
    let mining: boolean = true;
    while (mining) {
      const hash: crypto.Hash = crypto.createHash('sha256');
      hash.update((nonce + solution).toString());

      const attempt: string = hash.digest('hex');
      console.log('🔗', attempt);

      if (attempt.startsWith('0000')) {
        console.log(
          `\n🎉 Mined!\n\tSolution: ${attempt}\n\tAttempt: ${solution + 1}\n`
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
    const verifier: crypto.Verify = crypto.createVerify('sha256');
    verifier.update(transaction.toString());

    const isValid: boolean = verifier.verify(senderPublicKey, signature);
    if (isValid) {
      const block: Block = new Block(this.lastBlock.hash, transaction);
      this.mine(block.nonce);
      this.chain.push(block);
    }
  }
}
