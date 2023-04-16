import { useEffect } from 'react';
import { Td } from './Td';

function Tr({ item }) {
    return (
        <tr>
            {item.map((td) => (
                <Td td={td} />
            ))}
        </tr>
    );
}

export { Tr };
