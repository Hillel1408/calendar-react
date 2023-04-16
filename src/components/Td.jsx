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
}) {
    return (
        <td
            onClick={() => {
                setTrActive(trIndex);
                setTdActive(tdIndex);
            }}
            className={classNames(
                trActive === trIndex && tdIndex === tdActive && 'selected'
            )}
        >
            <span></span>
        </td>
    );
}

export { Td };
