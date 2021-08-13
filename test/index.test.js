const lxPages = require('..')

// TODO: Implement module test
test('lx-pages', () => {
  expect(lxPages('w')).toBe('w@zce.me')
  expect(lxPages('w', { host: 'wedn.net' })).toBe('w@wedn.net')
  expect(() => lxPages(100)).toThrow('Expected a string, got number')
})
