export const types = [
    'boolean',
    'number',
    'string',
    'array',
    'tuple',
    'object',
    'enum',
    'unknown',
    'any',
    'void',
    'null',
    'undefined',
    'never',
] as const;

export type BasicType = (typeof types)[number];

export type CompositeType = {
    name: string;
    children: (CompositeType | BasicType)[];
};

export const isBasicType = (
    type: CompositeType | BasicType
): type is BasicType => typeof type === 'string' && types.includes(type);

export const isCompositeType = (
    type: CompositeType | BasicType
): type is CompositeType => typeof type === 'object' && 'name' in type;
