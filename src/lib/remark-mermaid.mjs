/**
 * remark-Plugin: wandelt ```mermaid-Codeblöcke in rohes
 * `<pre class="mermaid">`-Markup um, statt sie von Shiki als Code
 * hervorheben zu lassen. Das eigentliche Rendern zu SVG übernimmt
 * clientseitig mermaid.js (siehe src/components/Mermaid.astro).
 *
 * Der Diagramm-Quelltext wird HTML-escaped, damit Zeichen wie `<br/>`
 * in Knotenlabels nicht vom Browser als Tags interpretiert werden –
 * mermaid liest sie über textContent wieder als reinen Text.
 */
export default function remarkMermaid() {
  return (tree) => walk(tree);
}

function walk(node) {
  if (!node || !Array.isArray(node.children)) return;
  node.children = node.children.map((child) => {
    if (child.type === "code" && child.lang === "mermaid") {
      const escaped = child.value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
      return { type: "html", value: `<pre class="mermaid">${escaped}</pre>` };
    }
    walk(child);
    return child;
  });
}
