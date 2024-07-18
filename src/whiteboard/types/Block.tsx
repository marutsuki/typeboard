import { forwardRef } from 'react';

export type BlockProps = {
    id: string;
    value: string;
    type: string;
    className?: string;
};

export const DynamicBlock = forwardRef<HTMLSpanElement, BlockProps>(
    ({ id, ...props }: BlockProps, ref) => {
        return (
            <StaticBlock id={id} className="!absolute" ref={ref} {...props} />
        );
    }
);

export const StaticBlock = forwardRef<HTMLSpanElement, BlockProps>(
    ({ id, value, type, className }, ref) => {
        return (
            <span
                {...(id && { id })}
                {...(type && { 'data-type': type })}
                ref={ref}
                className={`${className ? className : ''} cursor-pointer relative rounded-lg bg-violet-300 h-12 w-24 flex items-center justify-center`}
            >
                <p className="font-bold select-none">{value}</p>
            </span>
        );
    }
);
