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
    dragStartHandler,
    draggable,
    dropHandler,
}) {
    const dragOverHandler = (e) => {
        e.preventDefault();
        e.currentTarget.classList.add('grey');
    };
    const dragLeaveHandler = (e) => {
        e.currentTarget.classList.remove('grey');
    };
    const dragEndHandler = (e) => {
        e.currentTarget.classList.remove('grey');
    };
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
