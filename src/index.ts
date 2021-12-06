import Chain from './Chain';
import Wallet from './Wallet';

const a = new Wallet();
const b = new Wallet();
const c = new Wallet();
const d = new Wallet();

a.sendMoney(100, b.publicKey);
b.sendMoney(50, a.publicKey);
c.sendMoney(75, d.publicKey);
d.sendMoney(45, c.publicKey);

const blocks: Array<object> = Chain.instance.chain.map((block) => {
  return {
    previous: block.previousHash,
    transaction: {
      amount: block.transaction.amount,
      payer: block.transaction.payer,
      payee: block.transaction.payee,
    },
    timestamp: block.timestamp,
  };
});

console.log('Blocks:', blocks);
