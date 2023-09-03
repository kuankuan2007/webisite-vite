ArrayBuffer.prototype.toBase64=function () {
    return btoa(String.fromCharCode(...new Uint8Array(this)))
}
ArrayBuffer.prototype.toJSON=function (){
    return this.toBase64()
}
/**
 * Converts a string to a Uint8Array.
 *
 * @param {string} s - The input string to convert.
 * @return {Uint8Array} - The converted Uint8Array.
 */
Uint8Array.fromString=function (s){
    return this.from(s, c => c.charCodeAt(0))
}
export default 1