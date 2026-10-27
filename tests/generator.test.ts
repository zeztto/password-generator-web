import test from 'node:test';
import assert from 'node:assert/strict';
import {generatePasswords} from '../src/app/utils/password/generator.ts';
import {getSecureRandomInt,secureShuffleArray} from '../src/app/utils/crypto/secureRandom.ts';
const base={length:16,count:100,selectedUppercase:['A','B'],selectedLowercase:['a','b'],selectedNumbers:['2','3'],selectedSymbols:['!','@']};
test('Web Crypto generates unique values from selected characters only',()=>{
 const original=Math.random; Math.random=()=>{throw Error('insecure random used')};
 try { const {passwords}=generatePasswords(base); assert.equal(passwords.length,100); assert.equal(new Set(passwords).size,100); for(const p of passwords){assert.equal(p.length,16);assert.match(p,/^[ABab23!@]+$/);assert.doesNotMatch(p,/[01IlO]/);} } finally {Math.random=original;}
});
test('empty alphabet and finite combinations report warnings',()=>{
 assert.equal(generatePasswords({...base,selectedUppercase:[],selectedLowercase:[],selectedNumbers:[],selectedSymbols:[]}).passwords.length,0);
 const result=generatePasswords({...base,length:1,count:100,selectedUppercase:['A'],selectedLowercase:[],selectedNumbers:[],selectedSymbols:[]});
 assert.deepEqual(result.passwords,['A']);assert.ok(result.warning);
});
test('length and count boundaries validated by generator',()=>{
 for(const length of [-1,0,1.5,129,NaN,Infinity]){const result=generatePasswords({...base,length});assert.equal(result.passwords.length,0);assert.ok(result.warning);}
 for(const count of [-1,0,1.5,101,NaN,Infinity]){const result=generatePasswords({...base,count});assert.equal(result.passwords.length,0);assert.ok(result.warning);}
 assert.equal(generatePasswords({...base,length:128,count:1}).passwords[0].length,128);
});
test('random sampler range and shuffle invariants',()=>{
 for(const max of [1,2,92,256,257,1000]) for(let i=0;i<100;i++) {const n=getSecureRandomInt(max);assert.ok(Number.isInteger(n)&&n>=0&&n<max);}
 for(const max of [0,-1,1.5,NaN,Infinity,0x100000001]) assert.throws(()=>getSecureRandomInt(max));
 const input=['a','b','c'];assert.deepEqual(secureShuffleArray(input).sort(),input);assert.deepEqual(input,['a','b','c']);
});
