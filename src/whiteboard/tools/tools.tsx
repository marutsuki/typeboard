import { ReactNode } from 'react';
import { AppDispatch } from '../../store';
import startConnect from './connector/ConnectorTool';
import Tool from './Tool';

export const tools = (dispatch: AppDispatch): ReactNode[] => [
    <Tool
        name="Connector"
        description="Connects a parent type to a child type"
        use={() => startConnect(dispatch)}
    />,
];
