export default function MenuTree({
    menus,
    level = 0,
    onEdit,
    onDelete,
    isModerator,
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
                    isModerator={isModerator}
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
    isModerator,
}) {
    return (
        <>
            <tr className="border-b hover:bg-gray-50 transition">

                <td className="p-3">

                    <div
                        className="flex items-center"
                        style={{
                            paddingLeft: `${level * 28}px`,
                        }}
                    >
                        {level > 0 && (
                            <span className="text-gray-400 mr-2 text-lg">
                                ├─
                            </span>
                        )}

                        <span className="mr-2">
                            📁
                        </span>

                        <span className="font-medium">
                            {menu.title}
                        </span>

                        {menu.children?.length > 0 && (
                            <span className="ml-2 text-xs bg-gray-200 rounded-full px-2 py-0.5">
                                {menu.children.length}
                            </span>
                        )}
                    </div>

                </td>

                <td className="p-3 text-gray-600">
                    {menu.slug}
                </td>

                <td className="p-3">
                    {menu.sort_order}
                </td>

                {/* <td className="p-3">

                    <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                            menu.is_active
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                        }`}
                    >
                        {menu.is_active
                            ? "Active"
                            : "Inactive"}
                    </span>

                </td> */}

                <td className="p-3">

                    <div className="flex gap-2">

                        <button
                            onClick={() => onEdit(menu)}
                            className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 text-sm"
                        >
                            Edit
                        </button>

                          {!isModerator && (
        <button
            onClick={() => onDelete(menu)}
            className="text-red-600 hover:underline"
        >
            Delete
        </button>
    )}

                    </div>

                </td>

            </tr>

            {menu.children?.length > 0 && (

                <MenuTree
                    menus={menu.children}
                    level={level + 1}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    isModerator={isModerator}
                />

            )}

        </>
    );
}