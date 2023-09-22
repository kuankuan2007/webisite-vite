import xss, { FilterXSS } from "xss"
export const xssConfig={
    whiteList: {
        "a": [
            "target",
            "href",
            "title"
        ],
        "abbr": [
            "title"
        ],
        "address": [],
        "area": [
            "shape",
            "coords",
            "href",
            "alt"
        ],
        "article": [],
        "aside": [],
        "audio": [
            "autoplay",
            "controls",
            "crossorigin",
            "loop",
            "muted",
            "preload",
            "src"
        ],
        "b": [],
        "bdi": [
            "dir"
        ],
        "bdo": [
            "dir"
        ],
        "big": [],
        "blockquote": [
            "cite"
        ],
        "br": [],
        "caption": [],
        "center": [],
        "cite": [],
        "code": ["class"],
        "col": [
            "align",
            "valign",
            "span",
            "width"
        ],
        "colgroup": [
            "align",
            "valign",
            "span",
            "width"
        ],
        "svg":[],//ALL
        "path":[],//ALL
        "dd": [],
        "del": [
            "datetime"
        ],
        "details": [
            "open"
        ],
        "div": [],
        "dl": [],
        "dt": [],
        "em": [],
        "figcaption": [],
        "figure": [],
        "font": [
            "color",
            "size",
            "face"
        ],
        "footer": [],
        "h1": [],
        "h2": [],
        "h3": [],
        "h4": [],
        "h5": [],
        "h6": [],
        "header": [],
        "hr": [],
        "i": [],
        "img": [
            "src",
            "alt",
            "title",
            "width",
            "height"
        ],
        "ins": [
            "datetime"
        ],
        "li": [],
        "mark": [],
        "nav": [],
        "ol": [],
        "p": [],
        "pre": [],
        "s": [],
        "section": [],
        "small": [],
        "span": [],//all
        "sub": [],
        "summary": [],
        "sup": [],
        "strong": [],
        "strike": [],
        "table": [
            "width",
            "border",
            "align",
            "valign"
        ],
        "tbody": [
            "align",
            "valign"
        ],
        "td": [
            "width",
            "rowspan",
            "colspan",
            "align",
            "valign"
        ],
        "tfoot": [
            "align",
            "valign"
        ],
        "th": [
            "width",
            "rowspan",
            "colspan",
            "align",
            "valign"
        ],
        "thead": [
            "align",
            "valign"
        ],
        "tr": [
            "rowspan",
            "align",
            "valign"
        ],
        "tt": [],
        "u": [],
        "ul": [],
        "video": [
            "autoplay",
            "controls",
            "crossorigin",
            "loop",
            "muted",
            "playsinline",
            "poster",
            "preload",
            "src",
            "height",
            "width"
        ]
    },
    onTagAttr(tag, name, value, isWhiteAttr){
        if (['span','svg','path'].includes(tag)){
            console.log(tag,name,value,isWhiteAttr)
            return `${name}="${value}"`
        }
    }
}
const mainFilter = new FilterXSS(xssConfig);
export default  mainFilter