export class Enchiridion {
    static MODIFIED_KEY = 'enchiridion-last-modified';

    static async load(filename) {
        const res = await fetch(filename);
        const data = await res.json();
        return data;
    }

    static async lastModified(filename) {
        const res = await fetch(filename, { method: 'HEAD' });
        return res.headers.get('Last-Modified');
    }
}