export function isExternal(path) {
    // 通过一个正则表达式匹配 http 链接
    return /^(https?:|mailto:|tel:)/.test(path)
}
