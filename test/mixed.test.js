import { expect } from 'chai'

import capitalize from '../src/capitalize.js'
import defaultToAny from '../src/defaultToAny.js'
import endsWith from '../src/endsWith.js'
import every from '../src/every.js'
import get from '../src/get.js'
import isArrayLike from '../src/isArrayLike.js'
import reduce from '../src/reduce.js'
import words from '../src/words.js'
import countBy from '../src/countBy.js'
import camelCase from '../src/camelCase.js'

describe('mixed helpers', () => {
  describe('capitalize', () => {
    it('uppercases the first character and lowercases the rest', () => {
      expect(capitalize('fRED')).to.equal('Fred')
    })
  })

  describe('defaultToAny', () => {
    it('returns the first argument that is neither null nor undefined', () => {
      expect(defaultToAny(undefined, null, 'fallback', 'ignored')).to.equal('fallback')
    })
  })

  describe('endsWith', () => {
    it('checks the suffix using an optional position', () => {
      expect(endsWith('abc', 'c')).to.equal(true)
      expect(endsWith('abc', 'b', 2)).to.equal(true)
      expect(endsWith('abc', 'c', 10)).to.equal(true)
    })
  })

  describe('every', () => {
    it('returns true for empty arrays and stops on the first falsey predicate result', () => {
      expect(every([], () => false)).to.equal(true)
      expect(every([1, 2, 3], (value) => value < 3)).to.equal(false)
    })
  })

  describe('get', () => {
    it('navigates object paths and falls back to the provided default', () => {
      const object = { a: [{ b: { c: 3 } }] }
      expect(get(object, 'a[0].b.c')).to.equal(3)
      expect(get(object, 'a.b.c', 'default')).to.equal('default')
    })
  })

  describe('isArrayLike', () => {
    it('accepts array-like values but rejects functions', () => {
      expect(isArrayLike('abc')).to.equal(true)
      expect(isArrayLike({ length: 2 })).to.equal(true)
      expect(isArrayLike(() => {})).to.equal(false)
      expect(isArrayLike({ length: -1 })).to.equal(false)
    })
  })

  describe('reduce', () => {
    it('reduces arrays and objects using the provided iteratee', () => {
      expect(reduce([1, 2, 3], (sum, value) => sum + value, 0)).to.equal(6)

      const grouped = reduce({ a: 1, b: 2, c: 1 }, (result, value, key) => {
        if (!result[value]) {
          result[value] = []
        }
        result[value].push(key)
        return result
      }, {})

      expect(grouped).to.deep.equal({ 1: ['a', 'c'], 2: ['b'] })
    })
  })

  describe('words', () => {
    it('splits strings into word segments', () => {
      expect(words('fred, barney, & pebbles')).to.deep.equal(['fred', 'barney', 'pebbles'])
      expect(words('fred, barney, & pebbles', /[^, ]+/g)).to.deep.equal(['fred', 'barney', '&', 'pebbles'])
    })
  })

  describe('countBy', () => {
    it('counts occurrences returned by the iteratee, including the first item', () => {
      const counts = countBy([true, false, true], (value) => value)
      expect(counts).to.deep.equal({ true: 2, false: 1 })
    })
  })

  describe('camelCase', () => {
    it('joins words without adding leading spaces', () => {
      expect(camelCase('foo bar')).to.equal('fooBar')
    })
  })
})
