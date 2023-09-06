const nodes = [
    { id: 1, type: "read", val: "S", x: 100, y: 100 },
    { id: 2, type: "literal", val: 7, x: 200, y: 100 },
    { id: 3, type: "read", val: "S", x: 300, y: 100 },
    { id: 4, type: "literal", val: 25, x: 400, y: 100 },
    { id: 5, type: "op", val: "≪", x: 150, y: 150 },
    { id: 6, type: "op", val: "≫", x: 350, y: 150 },
    { id: 7, type: "op", val: "⊕", x: 250, y: 200 },
    { id: 8, type: "write", val: "S", x: 150, y: 250 },
    { id: 9, type: "op", val: "+", x: 350, y: 250 },
    { id: 10, type: "write", val: "B", x: 150, y: 300 },
    { id: 11, type: "read", val: "B", x: 350, y: 300 },
    { id: 12, type: "read", val: "B", x: 100, y: 350 },
    { id: 13, type: "literal", val: 7, x: 200, y: 350 },
    { id: 14, type: "read", val: "B", x: 300, y: 350 },
    { id: 15, type: "literal", val: 25, x: 400, y: 350 },
    { id: 16, type: "op", val: "≪", x: 150, y: 400 },
    { id: 17, type: "op", val: "≫", x: 350, y: 400 },
    { id: 18, type: "op", val: "⊕", x: 250, y: 450 },
    { id: 19, type: "literal", val: 0xdeadbeef, x: 150, y: 500, format: "hex" },
    { id: 20, type: "op", val: "+", x: 350, y: 500 },
]
const lines = [
    [1, 5], [2, 5], [5, 7],
    [3, 6], [4, 6], [6, 9], [9, 7],
    [7, 8],
]

const svg = document.querySelector('svg')


for (const node of nodes) {
    const { id, type, val, x, y } = node

    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text')
    text.setAttribute('x', '0')
    text.setAttribute('y', '0')
    text.setAttribute('text-anchor', 'middle')
    text.setAttribute('dominant-baseline', 'middle')
    text.setAttribute('fill', 'white')
    text.setAttribute('stroke', 'black')
    text.setAttribute('stroke-width', '2')
    text.setAttribute('paint-order', 'stroke fill')
    text.setAttribute('font-weight', 'bold')
    text.setAttribute('font-family', 'monospace')
    text.setAttribute('font-size', '16')
    // fit using text-length
    // text.setAttribute('lengthAdjust', 'spacingAndGlyphs')
    const textContent = node.format === "hex" ? `0x${val.toString(16)}` : String(val)
    text.textContent = textContent

    let shape
    if (type === "read" || type === "write") {
        shape = document.createElementNS('http://www.w3.org/2000/svg', 'polygon')
        shape.setAttribute('points', '-20,0 0,20 20,0 0,-20 -20,0')
        shape.setAttribute('fill', type === "read" ? 'green' : "red")
    } else if (type === "literal") {
        shape = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
        const width = Math.max(2, textContent.length) * 10
        text.setAttribute('textLength', width)
        shape.setAttribute('x', `${-width / 2 - 5}`)
        shape.setAttribute('y', "-15")
        shape.setAttribute('width', `${width + 10}`)
        shape.setAttribute('height', '30')
        shape.setAttribute('rx', '5')
        shape.setAttribute('ry', '5')
        shape.setAttribute('fill', "#f80")
    } else if (type === "op") {
        shape = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
        shape.setAttribute('cx', '0')
        shape.setAttribute('cy', '0')
        shape.setAttribute('r', '18')
        shape.setAttribute('fill', "#26f")
    }

    const group = document.createElementNS('http://www.w3.org/2000/svg', 'g')
    group.setAttribute('id', `node-${id}`)
    group.setAttribute('transform', `translate(${x},${y})`)
    if (shape) {
        group.appendChild(shape)
        shape.setAttribute('stroke', 'rgba(0,0,0,0.8)')
        shape.setAttribute('stroke-width', '1')
    }

    group.appendChild(text)
    group.setAttribute('filter', 'url(#glow)')

    svg.appendChild(group)
}
// document.body.removeChild(svg)
