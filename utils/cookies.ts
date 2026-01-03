import Cookies from "universal-cookie";

const cookies = new Cookies();

export const MyCookie = {
    get(key: string) {
        return cookies.get(key);
    },
    set(key: string, value: any, options?: any) {
        return cookies.set(key, value, options);
    },
    remove(key: string, options?: any) {
        return cookies.remove(key, options);
    }
}