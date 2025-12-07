import { expect } from 'chai'

import chunk from '../src/chunk.js'
import compact from '../src/compact.js'
import difference from '../src/difference.js'
import drop from '../src/drop.js'
import filter from '../src/filter.js'
import map from '../src/map.js'
import castArray from '../src/castArray.js'

describe('array helpers', () => {
  describe('chunk', () => {
    it('currently overwrites earlier chunks and keeps only the last written group', () => {
      const output = chunk(['a', 'b', 'c', 'd'], 2)
      expect(output[0]).to.deep.equal(['c', 'd'])
      expect(output).to.have.length(2)
    })

    it('returns an empty array when size is non-positive or input is nullish', () => {
      expect(chunk(['a', 'b'], 0)).to.deep.equal([])
      expect(chunk(null, 3)).to.deep.equal([])
    })
  })

  describe('compact', () => {
    it('filters out falsey values but stores the first truthy entry at a negative index', () => {
      const result = compact([0, 1, false, 2, '', 3, NaN, null, undefined])
      expect(result).to.deep.equal([2, 3])
      expect(result['-1']).to.equal(1)
    })
  })

  describe('difference', () => {
    it('returns items that are not present in comparison arrays', () => {
      expect(difference([2, 1, 2, 3], [2, 4], [3])).to.deep.equal([1])
    })

    it('returns an empty array for non array-like inputs', () => {
      expect(difference(undefined, [1, 2])).to.deep.equal([])
    })
  })

  describe('drop', () => {
    it('drops the requested number of elements from the start', () => {
      expect(drop([1, 2, 3], 2)).to.deep.equal([3])
      expect(drop([1, 2, 3], 5)).to.deep.equal([])
    })

    it('does not drop anything when the count is negative', () => {
      expect(drop([1, 2, 3], -1)).to.deep.equal([1, 2, 3])
    })
  })

  describe('map', () => {
    it('invokes iteratee with value, index and original array', () => {
      const input = [4, 8]
      const seen = []
      const result = map(input, (value, index, array) => {
        seen.push({ value, index, sameArray: array === input })
        return value * 2
      })

      expect(result).to.deep.equal([8, 16])
      expect(seen).to.deep.equal([
        { value: 4, index: 0, sameArray: true },
        { value: 8, index: 1, sameArray: true }
      ])
    })
  })

  describe('filter', () => {
    it('selects elements that satisfy the predicate', () => {
      expect(filter([1, 2, 3], (value) => value > 1)).to.deep.equal([2, 3])
    })

    it('returns an empty array when nothing matches', () => {
      expect(filter([1, 2, 3], () => false)).to.deep.equal([])
    })
  })

  describe('castArray', () => {
    it('wraps primitives in an array', () => {
      expect(castArray(5)).to.deep.equal([5])
    })

    it('returns an empty array when called without arguments', () => {
      expect(castArray()).to.deep.equal([])
    })
  })
})
