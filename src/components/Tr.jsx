import { useEffect } from 'react';
import { Td } from './Td';

function Tr({ item, trIndex, setTrActive, setTdActive, trActive, tdActive }) {
    return (
        <tr>
            {item.map((td, tdIndex) => (
                <Td
                    td={td}
                    trIndex={trIndex}
                    tdIndex={tdIndex}
                    setTrActive={setTrActive}
                    setTdActive={setTdActive}
                    trActive={trActive}
                    tdActive={tdActive}
                />
            ))}
        </tr>
    );
}

export { Tr };
