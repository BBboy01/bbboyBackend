const MarkdownIt = require("markdown-it");
const hljs = require("highlight.js");

module.exports = function (mdCode) {
  return new Promise((resolve, reject) => {
    const md = new MarkdownIt({
      html: true,
      linkify: true,
      typographer: true,
      highlight: function (str, lang) {
        // 此处判断是否有添加代码语言
        if (lang && hljs.getLanguage(lang)) {
          try {
            // 得到经过highlight.js之后的html代码
            const preCode = highlight(str, { language: lang, ignoreIllegals: true }).value;
            // 以换行进行分割
            const lines = preCode.split(/\n/).slice(0, -1);
            // 添加自定义行号
            let html = lines
              .map((item, index) => {
                return (
                  '<li><span class="line-num" data-line="' +
                  (index + 1) +
                  '"></span>' +
                  item +
                  "</li>"
                );
              })
              .join("");
            html = "<ol>" + html + "</ol>";
            // 添加代码语言
            if (lines.length) {
              html += '<b class="name">' + lang + "</b>";
            }
            return '<pre class="hljs"><code>' + html + "</code></pre>";
          } catch (__) {}
        }
        // 未添加代码语言，此处与上面同理
        const preCode = md.utils.escapeHtml(str);
        const lines = preCode.split(/\n/).slice(0, -1);
        let html = lines
          .map((item, index) => {
            return (
              '<li><span class="line-num" data-line="' + (index + 1) + '"></span>' + item + "</li>"
            );
          })
          .join("");
        html = "<ol>" + html + "</ol>";
        return '<pre class="hljs"><code>' + html + "</code></pre>";
      },
    });

    resolve(md.render(mdCode));
  });
};
