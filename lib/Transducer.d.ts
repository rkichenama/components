declare const Transducer: {
    map: (transform: Function) => (reducer: Function) => (t: any, c: any) => any;
    filter: (predicate: Function) => (reducer: Function) => (t: any, c: any) => any;
};
