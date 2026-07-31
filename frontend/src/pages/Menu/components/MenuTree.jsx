export default function MenuTree({
    menus,
    level = 0,
    onEdit,
    onDelete,
}) {
    return (
        <>
            {menus.map((menu) => (
                <MenuRow
                    key={menu.id}
                    menu={menu}
                    level={level}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </>
    );
}

function MenuRow({
    menu,
    level,
    onEdit,
    onDelete,
}) {
    return (
        <>
            <tr className="border-t">

                <td className="p-3">

                    <div
                        className="flex items-center"
                        style={{
                            paddingLeft: `${level * 24}px`,
                        }}
                    >
                        {level > 0 && (
                            <span className="mr-2 text-gray-400">
                                └─
                            </span>
                        )}

                        {menu.title}
                    </div>

                </td>

                <td className="p-3">
                    {menu.slug}
                </td>

                <td className="p-3">
                    {menu.sort_order}
                </td>

                <td className="p-3 space-x-2">

                    <button
                        onClick={() => handleEdit(menu)}
                        className="text-blue-600 hover:underline"
                    >
                        Edit
                    </button>

                    <button
                        onClick={() => onDelete(menu)}
                        className="text-red-600 hover:underline"
                    >
                        Delete
                    </button>

                </td>

            </tr>

            {menu.children?.length > 0 && (
                <MenuTree
                    menus={menu.children}
                    level={level + 1}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            )}
        </>
    );
}