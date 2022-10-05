// is faster at smaller objects https://jsbench.me/gvl8q5pbm2/2

export default function deepCopy(item: any, blacklist: string[] = []): any {
  if (Array.isArray(item) === true) {
    // if its an array it runs deepcopy for the entire array
    const copy: any[] = [];
    for (let i = 0, l = item.length; i < l; i++) {
      copy.push(deepCopy(item[i], blacklist));
    }
    return copy;
  }
  if (item !== null && item.constructor.name === "Object") {
    // if its an object it runs deepcopy for the entire object
    interface Copy {
      [key: string]: any;
    }
    const copy: Copy = {};
    const keys: string[] = Object.keys(item);
    for (let i = 0; i < keys.length; i++) {
      if (blacklist.indexOf(keys[i]) !== -1) continue; // skip if its in blacklist
      copy[keys[i]] = deepCopy(item[keys[i]], blacklist);
    }
    return copy;
  }
  // if its an number, string etc it just returns the item
  return item;
}
