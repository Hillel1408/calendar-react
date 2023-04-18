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
    dragLeaveHandler,
    dragEndHandler,
    dragOverHandler,
    dragStartHandler,
    draggable,
    dropHandler,
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
            <span
                draggable={draggable}
                onDragOver={(e) => dragOverHandler(e)}
                onDragLeave={(e) => dragLeaveHandler(e)}
                onDragStart={(e) => dragStartHandler(e, trIndex, tdIndex)}
                onDragEnd={(e) => dragEndHandler(e)}
                onDrop={(e) => dropHandler(e, trIndex, tdIndex)}
            ></span>
        </td>
    );
}

export { Td };
