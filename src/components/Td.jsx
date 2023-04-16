import { useState } from 'react';
import classNames from 'classnames';

function Td({
    td,
    trIndex,
    tdIndex,
    setTrActive,
    setTdActive,
    trActive,
    tdActive,
    setActive,
}) {
    return (
        <td
            onClick={() => {
                setTrActive(trIndex);
                setTdActive(tdIndex);
                setActive(td);
            }}
            className={classNames(
                td && 'active',
                trActive === trIndex && tdIndex === tdActive && 'selected'
            )}
        >
            <span></span>
        </td>
    );
}

export { Td };
