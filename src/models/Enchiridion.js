export class Enchiridion {
    static load(filename) {
        let json;
        fetch(filename).then((res) => res.json()).then((data) => json = data);
        return json;
    }
}