import { EventEmitter } from '../src'

describe('listen and emit', () => {
  test('should fire', () => {
    const emitter = new EventEmitter<void>()
    const event = emitter.event

    let count = 0
    const listener1 = event(() => count++)
    expect(count).toBe(0)

    emitter.fire()
    expect(count).toBe(1)

    emitter.fire()
    expect(count).toBe(2)

    const listener2 = event(() => count++)

    emitter.fire()
    expect(count).toBe(4)

    listener2.dispose()
    emitter.fire()
    expect(count).toBe(5)

    listener1.dispose()
    emitter.fire()
    expect(count).toBe(5)
  })

  test('dispose all', () => {
    const emitter = new EventEmitter<void>()
    const event = emitter.event

    let count = 0
    event(() => count += 2)
    event(() => count += 1)
    expect(count).toBe(0)

    emitter.fire()
    expect(count).toBe(3)

    emitter.dispose()

    emitter.fire()
    expect(count).toBe(3)
  })

  test('class member', () => {
    class Counter {
      private _value = 0
      private _onChanged = new EventEmitter<number>()
      public readonly onChanged = this._onChanged.event

      increse () {
        this._value++
        this._onChanged.fire(this.value)
      }

      get value () {
        return this._value
      }
    }

    const counter = new Counter()

    expect(counter.value).toBe(0)

    counter.onChanged((n) => {
      expect(n).toBe(1)
    })
    counter.increse()

    expect(counter.value).toBe(1)
  })
})
