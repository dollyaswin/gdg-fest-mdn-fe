/**
 * Property decorator to create a getter and asynchronous setter for a property
 * this helps prevent numerous Angular error, such as the famous NG0100 error.
 * @param options (optional) define optional functions to run before set or get
 * @return setter and getter
 */
 export function AsyncAccessor(options?: {
  beforeSet?: <R = any>(v: any) => R;
  beforeGet?: <R = any>(v: any) => R;
  setWait?: number;
}) {
  return function (T: Object, K: PropertyKey) {
    let value: any;
    Object.defineProperty(T, K, {
      get: () =>
        options?.beforeGet !== undefined ? options.beforeGet(value) : value,
      set: (v: any) =>
        void setTimeout(
          () =>
            (value =
              options?.beforeSet !== undefined ? options.beforeSet(v) : v),
          options?.setWait
        ),
    });
  };
}
