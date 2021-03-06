import { isRecord } from "@samual/lib"
import { Expression, ExpressionKind } from "./parse"

export const printNode = (node: Record<string, unknown>, indentString = `\t`, indentLevel = 0): string => {
	const { kind, ...nodeProperties } = node
	let o = ``

	o += `${typeof kind == `number` ? ExpressionKind[kind] : `-`}\n`
	indentLevel++

	for (const [ name, value ] of Object.entries(nodeProperties)) {
		o += `${indentString.repeat(indentLevel)}${name}:`

		if (typeof value == `bigint`)
			o += ` ${value}n\n`
		else if (Array.isArray(value))
			o += `\n${printNodes(value, indentString, indentLevel + 1)}`
		else if (isRecord(value))
			o += ` ${printNode(value, indentString, indentLevel)}`
		else
			o += ` ${JSON.stringify(value)}\n`
	}

	return o
}

export default printNode

export const printNodes = (nodes: Node[], indentString = `\t`, indentLevel = 0): string => {
	let o = ``

	for (const node of nodes)
		o += `${indentString.repeat(indentLevel)}${printNode(node, indentString, indentLevel)}\n`

	return o
}
