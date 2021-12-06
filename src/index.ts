import Wallet from './Wallet';

const a = new Wallet();
const b = new Wallet();
const c = new Wallet();
const d = new Wallet();

a.sendMoney(100, b.publicKey);
b.sendMoney(50, a.publicKey);
c.sendMoney(75, d.publicKey);
d.sendMoney(45, c.publicKey);
