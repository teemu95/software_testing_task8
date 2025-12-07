import { expect } from 'chai'

import clamp from '../src/clamp.js'
import divide from '../src/divide.js'
import ceil from '../src/ceil.js'

describe('math helpers', () => {
  describe('divide', () => {
    it('divides the dividend by the divisor', () => {
      expect(divide(6, 3)).to.equal(2)
    })
  })

  describe('clamp', () => {
    it('returns the input when it is already within the bounds', () => {
      expect(clamp(3, -5, 5)).to.equal(3)
    })
  })

  describe('ceil', () => {
    it('rounds up to the nearest integer or precision', () => {
      expect(ceil(4.006)).to.equal(5)
      expect(ceil(6.004, 2)).to.equal(6.01)
    })
  })
})
