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
        let d = new Date;
        d.setTime(d.getTime() + ((days) ? 24*60*60*1000*days : '9999999999'));
        document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
    }
    delete(name) { this.set(name, '', -1); }
}