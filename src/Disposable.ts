export interface IDisposable {
  dispose: () => any
}

export class Disposable implements IDisposable {
  /**
   * Combine many disposable-likes into one. Use this method
   * when having objects with a dispose function which are not
   * instances of Disposable.
   *
   * @param disposableLikes Objects that have at least a `dispose`-function member.
   * @return Returns a new disposable which, upon dispose, will
   * dispose all provided disposables.
   */
  static from (...disposableLikes: IDisposable[]): Disposable {
    return new Disposable(() => {
      for (const disposable of disposableLikes)
        disposable.dispose()
    })
  }

  private disposed = false
  /**
   * Creates a new Disposable calling the provided function
   * on dispose.
   * @param callOnDispose Function that disposes something.
   */
  constructor (private callOnDispose: Function) {}

  /**
   * Dispose this object.
   */
  dispose () {
    if (!this.disposed)
      this.callOnDispose()
    this.disposed = true
  }
}
