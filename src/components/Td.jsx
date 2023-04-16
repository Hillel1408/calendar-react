import { useState } from 'react';
import classNames from 'classnames';

function Td({ td }) {
    const [selected, setSelected] = useState(false);

    return (
        <td
            onClick={() => setSelected(!selected)}
            className={classNames(td && 'active', selected && 'selected')}
        >
            <span></span>
        </td>
    );
}

export { Td };
