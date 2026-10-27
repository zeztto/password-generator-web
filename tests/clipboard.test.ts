import test from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import {act,create} from 'react-test-renderer';
import {useClipboard} from '../src/app/hooks/useClipboard.ts';

test('new result identity clears copied feedback and late clipboard completion',async()=>{
 const descriptor=Object.getOwnPropertyDescriptor(globalThis,'navigator');
 let resolveWrite:()=>void=()=>{};
 Object.defineProperty(globalThis,'navigator',{configurable:true,value:{clipboard:{writeText:()=>new Promise<void>(resolve=>{resolveWrite=resolve;})}}});
 let api:ReturnType<typeof useClipboard>;
 function Harness({passwords}:{passwords:string[]}){api=useClipboard(passwords);return null;}
 let renderer:ReturnType<typeof create>;
 try {
  act(()=>{renderer=create(React.createElement(Harness,{passwords:['synthetic-first']}));});
  let first:Promise<void>;
  act(()=>{first=api.copyToClipboard('synthetic-first',0);});
  await act(async()=>{resolveWrite();await first;});
  assert.equal(api.copiedIndex,0);
  act(()=>{renderer.update(React.createElement(Harness,{passwords:['synthetic-second']}));});
  assert.equal(api.copiedIndex,null);
  let pending:Promise<void>;
  act(()=>{pending=api.copyToClipboard('synthetic-second',0);});
  act(()=>{renderer.update(React.createElement(Harness,{passwords:['synthetic-third']}));});
  await act(async()=>{resolveWrite();await pending;});
  assert.equal(api.copiedIndex,null);assert.equal(api.copyError,'');
 }finally{
  act(()=>renderer?.unmount());
  if(descriptor)Object.defineProperty(globalThis,'navigator',descriptor);else Reflect.deleteProperty(globalThis,'navigator');
 }
});

test('clipboard rejection clears success and surfaces failure',async()=>{
 const descriptor=Object.getOwnPropertyDescriptor(globalThis,'navigator');
 let reject=false;
 Object.defineProperty(globalThis,'navigator',{configurable:true,value:{clipboard:{writeText:async()=>{if(reject)throw Error('denied');}}}});
 let api:ReturnType<typeof useClipboard>;
 // Keep the input array stable across state updates, as it is in the app.
 const passwords=['synthetic-value'];
 function StableHarness(){api=useClipboard(passwords);return null;}
 let renderer:ReturnType<typeof create>;
 try{
  act(()=>{renderer=create(React.createElement(StableHarness));});
  await act(async()=>{await api.copyToClipboard('synthetic-value',0);});
  assert.equal(api.copiedIndex,0);
  reject=true;
  await act(async()=>{await api.copyToClipboard('synthetic-value',0);});
  assert.equal(api.copiedIndex,null);assert.ok(api.copyError);
 }finally{
  act(()=>renderer?.unmount());
  if(descriptor)Object.defineProperty(globalThis,'navigator',descriptor);else Reflect.deleteProperty(globalThis,'navigator');
 }
});
