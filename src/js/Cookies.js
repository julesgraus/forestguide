/**
 * Manage cookies with this class
 */
export default class Cookies {
    /**
     * Get a cookie's value
     *
     * @param {string} name
     * @return {any}
     */
    get(name) {
        let v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
        return v ? v[2] : null;
    }

    /**
     * Set a cookies value
     *
     * @param {string} name
     * @param {any} value
     * @param {int|null} days or null for "forever"
     */
    set(name, value, days = null) {
        let date = new Date();
        if(!days) date = new Date(8640000000000000); //maximum possible value
        else date.setTime(date.getTime() + (86400000  * days)); //86400000 milliseconds in a day
        document.cookie = name + "=" + value + ";path=/;expires=" + date.toGMTString();
    }
    delete(name) { this.set(name, '', -1); }
}