import React from 'react';

describe('some unit test', () => {
  it('which passes on a simple test', () => {
    expect(3).toBe(3);
  });
  it('which can contain some JSX and is a passing test', () => {
    expect(<div>a</div>).not.toBe(
      <div>b</div>
    );
  });
});
