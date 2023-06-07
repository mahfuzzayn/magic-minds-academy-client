import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import React from "react";
import { FaBars } from "react-icons/fa";

const NavBar = () => {
    return (
        <div>
            <Menu>
                <MenuButton
                    as={IconButton}
                    aria-label="Options"
                    icon={<FaBars />}
                    variant="outline"
                />
                <MenuList>
                    <MenuItem>New Tab</MenuItem>
                    <MenuItem>New Window</MenuItem>
                    <MenuItem>New Tab</MenuItem>
                    <MenuItem>New Window</MenuItem>
                </MenuList>
            </Menu>
        </div>
    );
};

export default NavBar;
