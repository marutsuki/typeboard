import { FC } from 'react';
import { useSelector } from 'react-redux';
import { selectEdit } from './edit.slice';
import EditWindow from './EditWindow';

type EditWindowProviderProps = {
    children: React.ReactNode;
};

const EditWindowProvider: FC<EditWindowProviderProps> = ({ children }) => {
    const editContext = useSelector(selectEdit);
    return (
        <>
            {children}
            {editContext.id !== null ? (
                <EditWindow
                    id={editContext.id}
                    location={editContext.location}
                />
            ) : (
                ''
            )}
        </>
    );
};

export default EditWindowProvider;
