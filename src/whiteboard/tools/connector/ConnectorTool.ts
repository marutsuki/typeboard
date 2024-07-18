import { AppDispatch } from '../../../store';
import { connectTypes } from '../../types/types.slice';

export default function startConnect(dispatch: AppDispatch) {
    let src: string;
    let tgt: string;
    const onTargetSelection = () => {
        const id = scanAnyBlocks();
        if (id) {
            tgt = id;
            dispatch(connectTypes({ parent: src, child: tgt }));
        }
        removeEventListener('click', onTargetSelection);
    };
    const onMouseDown = () => {
        const id = scanCompositeBlocks();
        console.log(id);
        if (id) {
            src = id;
            addEventListener('click', onTargetSelection);
        }
        removeEventListener('click', onMouseDown);
    };
    addEventListener('click', onMouseDown);
}

const scanAnyBlocks = () => {
    const composites = document
        .querySelectorAll(
            "[data-type='composite']:hover, [data-type='basic']:hover"
        )
        .values();

    const target = composites.next();
    if (target.done) {
        return null;
    }
    return target.value.id;
};

const scanCompositeBlocks = () => {
    const composites = document
        .querySelectorAll("[data-type='composite']:hover")
        .values();

    const target = composites.next();
    if (target.done) {
        return null;
    }
    return target.value.id;
};
