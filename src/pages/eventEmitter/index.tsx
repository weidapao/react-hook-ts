import React, { useRef, FC } from 'react';
import { useEventEmitter, EventEmitter } from '../hook/useEventEmitter';
const MessageBox: FC<{
  focus$: EventEmitter;
}> = function(props) {
  return (
    <div style={{ paddingBottom: 24 }}>
      <p>You received a message</p>
      <button
        type="button"
        onClick={() => {
          props.focus$.emit('focus');
        }}
      >
        Reply
      </button>
    </div>
  );
};
const InputBox: FC<{
  focus$: EventEmitter;
}> = function(props) {
  const inputRef = useRef<any>();
  props.focus$.on('focus',() => {
    inputRef.current.focus();
  });
  return (
    <input
      ref={inputRef}
      placeholder="Enter reply"
      style={{ width: '100%', padding: '4px' }}
    />
  );
};


export default function() {
  const focus$ = useEventEmitter();
  return (
    <>
      <MessageBox focus$={focus$} />
      <InputBox focus$={focus$} />
    </>
  );
}
