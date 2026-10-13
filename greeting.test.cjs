const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { test } = require('node:test');
const { runInNewContext } = require('node:vm');

const html = readFileSync(`${__dirname}/index.html`, 'utf8');
const script = readFileSync(`${__dirname}/greeting.js`, 'utf8');

test('page includes the exact greeting and loads the date script', () => {
  assert.match(html, /<h1>Hello from my phone<\/h1>/);
  assert.match(html, /<time id="today"><\/time>/);
  assert.match(html, /<script src="greeting\.js" defer><\/script>/);
  assert.match(html, /name="viewport"/);
});

for (const [year, month, day, expected] of [
  [2026, 9, 13, '2026-10-13'],
  [2027, 0, 1, '2027-01-01'],
  [2028, 1, 29, '2028-02-29'],
]) {
  test(`renders the local date ${expected} on page load`, () => {
    const element = {};
    class LocalDate extends Date {
      constructor() {
        super(year, month, day, 0, 1);
      }
      toISOString() {
        throw new Error('The displayed date must use local calendar fields');
      }
    }
    runInNewContext(script, {
      Date: LocalDate,
      document: {
        getElementById(id) {
          assert.equal(id, 'today');
          return element;
        },
      },
    });
    assert.equal(element.textContent, expected);
    assert.equal(element.dateTime, expected);
  });
}
