const test = require('node:test')
const assert = require('node:assert/strict')

const {
  HIGHLIGHT_CLASS,
  updateVisibleHighlight,
} = require('../sidebar-highlight.js')

class FakeClassList {
  constructor(element, classes = []) {
    this.element = element
    this.classes = new Set(classes)
  }

  add(name) {
    if (!this.classes.has(name)) {
      this.classes.add(name)
      this.element.mutationCount += 1
    }
  }

  remove(name) {
    if (this.classes.has(name)) {
      this.classes.delete(name)
      this.element.mutationCount += 1
    }
  }

  contains(name) {
    return this.classes.has(name)
  }
}

class FakeElement {
  constructor(name, { visible = true, classes = [] } = {}) {
    this.name = name
    this.parentElement = null
    this.offsetParent = visible ? {} : null
    this.mutationCount = 0
    this.classList = new FakeClassList(this, classes)
    this.closestMap = new Map()
    this.scopeQueryResult = null
  }

  closest(selector) {
    return this.closestMap.get(selector) ?? null
  }

  querySelector(selector) {
    if (selector === ':scope > .chapter-link-wrapper > a, :scope > a') {
      return this.scopeQueryResult
    }
    return null
  }
}

function createScenario({ currentVisible }) {
  const current = new FakeElement('current', { visible: currentVisible, classes: ['current-header'] })
  const currentLi = new FakeElement('current-li')
  const parentOl = new FakeElement('parent-ol')
  const parentLi = new FakeElement('parent-li')
  const parentLink = new FakeElement('parent-link')

  current.closestMap.set('li', currentLi)
  currentLi.parentElement = parentOl
  parentOl.closestMap.set('li', parentLi)
  parentLi.scopeQueryResult = parentLink

  const document = {
    highlighted: [],
    current,
    querySelector(selector) {
      if (selector === '.on-this-page .current-header') {
        return this.current
      }
      return null
    },
    querySelectorAll(selector) {
      if (selector !== `.${HIGHLIGHT_CLASS}`) {
        return []
      }
      return this.highlighted.filter(element => element.classList.contains(HIGHLIGHT_CLASS))
    },
  }

  return { document, parentLink }
}

test('highlights the nearest visible parent when the current heading is hidden', () => {
  const { document, parentLink } = createScenario({ currentVisible: false })
  document.highlighted = [parentLink]

  const target = updateVisibleHighlight(document)

  assert.equal(target, parentLink)
  assert.equal(parentLink.classList.contains(HIGHLIGHT_CLASS), true)
})

test('repeat updates do not keep mutating the same highlight target', () => {
  const { document, parentLink } = createScenario({ currentVisible: false })
  document.highlighted = [parentLink]

  updateVisibleHighlight(document)
  const firstPassMutations = parentLink.mutationCount
  updateVisibleHighlight(document)

  assert.equal(firstPassMutations, 1)
  assert.equal(parentLink.mutationCount, 1)
})

test('clears the bubbled highlight when the current heading is already visible', () => {
  const { document, parentLink } = createScenario({ currentVisible: true })
  parentLink.classList.add(HIGHLIGHT_CLASS)
  document.highlighted = [parentLink]

  const target = updateVisibleHighlight(document)

  assert.equal(target, null)
  assert.equal(parentLink.classList.contains(HIGHLIGHT_CLASS), false)
})
