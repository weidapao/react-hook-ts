import React, { useEffect, useState } from 'react';
import { IRouteComponentProps, Link } from 'umi';

export default (props: IRouteComponentProps) => {
  return (
    <div style={{ display: 'flex', padding: '20px' }}>
      <div style={{ display: 'flex', flexDirection: 'column',width:'200px' }}>
        <Link to="/eventEmitter">useEventEmitter</Link>
        <Link to="/eventListener">useEventListener</Link>
        <Link to="/map">useMap</Link>
        <Link to="/toggle">useToggle</Link>
        <Link to="/debounce">useDebounce</Link>
      </div>
      <div style={{flex:1}}>{props.children}</div>
    </div>
  );
};
