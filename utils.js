import { v4 as uuid } from 'uuid';

export function RandomString() {
    let a = uuid().toString();
    let b = uuid().toString();
    a = a.replaceAll('-', String.fromCharCode(97 + parseInt(Math.random() * 10)));
    b = b.replaceAll('-', String.fromCharCode(97 + parseInt(Math.random() * 10)));
    const c = a + b;
    return c;
}