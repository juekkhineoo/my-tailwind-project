'use client';

import SidebarNavLink from "./SidebarNavLink";

const SidebarLayout = () => {
    return (
        <aside className="w-64 bg-gray-800 text-white p-4">
            <h2 className="text-xl font-bold mb-4">My Test Project</h2>
            <nav>
                <nav>
                    <SidebarNavLink href="/">Home</SidebarNavLink>
                    <SidebarNavLink href="/polygon">Draw Polygon</SidebarNavLink>
                    {/* <SidebarNavLink href="/example">Group Drag</SidebarNavLink>
                    <SidebarNavLink href="/shape">Drawing Shape</SidebarNavLink> */}
                    <SidebarNavLink href="/user">UserInfo</SidebarNavLink>
                </nav>
            </nav>
        </aside>
    )
}

export default SidebarLayout;