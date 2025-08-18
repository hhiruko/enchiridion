export class Enchiridion {
    static async load(filename) {
        const res = await fetch(filename);
        const data = await res.json();
        return data;
    }
}