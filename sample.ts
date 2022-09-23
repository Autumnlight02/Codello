
interface Base {
    type: "A" | "B";
}

interface B extends Base {
    type: "B";
}

class base implements Base {
    protected _type: Base["type"];
    constructor(prop: Base["type"]) {
        this._type = prop;
    }
    get type() {
        return this._type;
    }
}

class b extends base implements B {
    constructor() {
        super("B");
    }
}

interface b {
    get type(): B["type"];
}

const test = new b();
console.log(test.type); //(property) base.type: "A" | "B"
  //test.type always returns B since the super gets called only with B but typescript for some reason assumes it can be both
  //In chrome it always returns "B"