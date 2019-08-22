import React from 'react';

export default function Copyright() {
  return <div style={{
    width: '100%',
    position: 'fixed',
    bottom: 0,
    color: 'rgba(0, 0, 0, 0.447)',
    padding: 10,
    textAlign: 'center'
  }}>版权所有 人职初 Copyright © 2015
        - {new Date().getFullYear()} wodedagong.com Inc. All Rights Reserved.
    </div>;
}
