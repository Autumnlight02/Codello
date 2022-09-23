//todo check if its working
export default function deepFreeze(item: any, blacklist: string[] = []) {
    if (Array.isArray(item) === true) {
        Object.freeze(item)
        for (let i = 0, l = item.length; i < l; i++) {
            deepFreeze(item[i], blacklist)
        }
    }
    if (item !== null && item.constructor.name === "Object") {
        const keys: string[] = Object.keys(item);
        for (let i = 0; i < keys.length; i++) {
            if (blacklist.indexOf(keys[i]) !== -1) continue; // skip if its in blacklist
            deepFreeze(item[keys[i]], blacklist);
        }
    }
    return item
}
