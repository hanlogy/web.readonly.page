import type { Literal } from 'hast';
import { type State } from 'mdast-util-to-hast';

// See:
// https://github.com/syntax-tree/mdast-util-to-hast?tab=readme-ov-file#handler
export function metadataAstHandler(state: State, { value }: Literal) {
  const node = {
    type: 'yaml',
    value,
    children: [{ type: 'raw', value }],
  } as const;

  const result = {
    type: 'element' as const,
    tagName: 'metadata',
    properties: {},
    children: state.all(node),
  };

  state.patch(node, result);
  return state.applyData(node, result);
}
