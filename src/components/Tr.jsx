import { useEffect } from 'react';
import { Td } from './Td';

function Tr({
    item,
    trIndex,
    setTrActive,
    setTdActive,
    trActive,
    tdActive,
    setActive,
}) {
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
                    setActive={setActive}
                />
            ))}
        </tr>
    );
}

export { Tr };
