import { useEffect } from 'react';
import { Td } from './Td';

function Tr({ item }) {
    return (
        <tr>
            {item.map((td) => (
                <Td />
            ))}
        </tr>
    );
}

export { Tr };
