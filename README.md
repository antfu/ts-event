<h1><b>TS</b>Event</h1>

Typescript Event Emitter with the same API of vscode

## Basic Usage

```ts
class Counter {
  // define the emitter
  private _onChanged = new EventEmitter<number>()
  public readonly onChanged = this._onChanged.event

  private _value = 0

  get value() {
    return this._value
  }

  set value(v) {
    this._value = v
    this._onChanged.fire(this.value)
  }
}

const counter = new Counter()

counter.onChanged(n => { // n is number here
  console.log(`The new value is ${n}`)
})

counter.value = 5 // Output: The new value is 5
```

## License

[MIT](./LICENSE) © [antfu](https://github.com/antfu) 2019
