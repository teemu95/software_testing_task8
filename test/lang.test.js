import { expect } from 'chai'

import add from '../src/add.js'
import defaultTo from '../src/defaultTo.js'
import eq from '../src/eq.js'
import isEmpty from '../src/isEmpty.js'
import toNumber from '../src/toNumber.js'
import toString from '../src/toString.js'

describe('language helpers', () => {
  describe('add', () => {
    it('adds two numeric values', () => {
      expect(add(6, 4)).to.equal(10)
    })

    it('concatenates when either argument is a string', () => {
      expect(add('6', 4)).to.equal('64')
    })
  })

  describe('defaultTo', () => {
    it('falls back to the default when the value is nullish', () => {
      expect(defaultTo(null, 'fallback')).to.equal('fallback')
      expect(defaultTo(undefined, 10)).to.equal(10)
    })

    it('keeps provided values when they are neither null nor undefined', () => {
      expect(defaultTo(false, 'fallback')).to.equal(false)
    })
  })

  describe('eq', () => {
    it('matches NaN values and identical object references', () => {
      const obj = { a: 1 }
      expect(eq(NaN, NaN)).to.equal(true)
      expect(eq(obj, obj)).to.equal(true)
      expect(eq(obj, { a: 1 })).to.equal(false)
    })
  })

  describe('isEmpty', () => {
    it('treats nullish values as empty', () => {
      expect(isEmpty(null)).to.equal(true)
      expect(isEmpty(undefined)).to.equal(true)
    })

    it('handles common collections and iterables', () => {
      expect(isEmpty([1, 2])).to.equal(false)
      expect(isEmpty('abc')).to.equal(false)
      expect(isEmpty(new Map())).to.equal(true)
      expect(isEmpty(new Map([['key', 'value']]))).to.equal(false)
    })

    it('detects own enumerable properties on objects', () => {
      expect(isEmpty({})).to.equal(true)
      expect(isEmpty({ a: 1 })).to.equal(false)
    })
  })

  describe('toNumber', () => {
    it('parses binary and trims whitespace', () => {
      expect(toNumber('  0b1111  ')).to.equal(15)
    })

    it('returns NaN for symbols and respects valueOf on objects', () => {
      const wrapped = {
        valueOf() {
          return '3.5'
        }
      }

      expect(Number.isNaN(toNumber(Symbol('s')))).to.equal(true)
      expect(toNumber(wrapped)).to.equal(3.5)
    })
  })

  describe('toString', () => {
    it('preserves the sign of negative zero', () => {
      expect(toString(-0)).to.equal('-0')
    })

    it('joins array entries recursively', () => {
      expect(toString([1, [2, 3]])).to.equal('1,2,3')
    })
  })
})
