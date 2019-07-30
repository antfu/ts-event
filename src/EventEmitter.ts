import { Disposable, IDisposable } from './Disposable'

export type IEventListener<T> = (e: T) => any

export interface IEvent<T> {

  /**
   * A function that represents an event to which you subscribe by calling it with
   * a listener function as argument.
   *
   * @param listener The listener function will be called when the event happens.
   * @param thisArgs The `this`-argument which will be used when calling the event listener.
   * @param disposables An array to which a [disposable](#Disposable) will be added.
   * @return A disposable which unsubscribes the event listener.
   */
  (listener: (e: T) => any, thisArgs?: any, disposables?: Disposable[]): Disposable
}

export class EventEmitter<T> {
  protected _listeners: IEventListener<T>[] = []
  protected _disposeables: IDisposable[] = []

  /**
   * The event listeners can subscribe to.
   */
  get event (): IEvent<T> {
    return (listener: IEventListener<T>, thisArgs?: any, disposables: IDisposable[] = []) => {
      const _listener: IEventListener<T> = (e: T) => listener.bind(thisArgs)(e)
      const _disposable = Disposable.from(new Disposable(() => {
        this.removeListener(_listener)
        this.removeDisposable(_disposable)
      }), ...disposables)
      this._listeners.push(_listener)
      this._disposeables.push(_disposable)
      return _disposable
    }
  }

  private removeListener (listener: IEventListener<T>) {
    const index = this._listeners.indexOf(listener)
    if (index > -1)
      this._listeners.splice(index, 1)
  }

  private removeDisposable (disposable: IDisposable) {
    const index = this._disposeables.indexOf(disposable)
    if (index > -1)
      this._disposeables.splice(index, 1)
  }

  /**
   * Notify all subscribers of the [event](#EventEmitter.event). Failure
   * of one or more listener will not fail this function call.
   *
   * @param data The event object.
   */
  fire (data: T): void{
    for (const listener of this._listeners)
      listener(data)
  }

  /**
   * Dispose this object and free resources.
   */
  dispose (): void {
    // clone the disposable array
    const _disposeables = Array.from(this._disposeables)
    // dispose
    for (const disposable of _disposeables)
      disposable.dispose()
  }
}
