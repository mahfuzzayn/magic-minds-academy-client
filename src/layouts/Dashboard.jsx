import {
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { Outlet } from "react-router-dom";

const Dashboard = () => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const handleClick = (newSize) => {
        onOpen();
    };
    return (
        <div className="dashboard">
            <Button
                onClick={() => handleClick('xs')}
                key='xs'
                m={4}
            >{`Open xs Drawer`}</Button>
            <Drawer placement="left" onClose={onClose} isOpen={isOpen} size="xs">
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>{`xs drawer contents`}</DrawerHeader>
                    <DrawerBody>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Consequat nisl vel pretium
                            lectus quam id. Semper quis lectus nulla at volutpat
                            diam ut venenatis. Dolor morbi non arcu risus quis
                            varius quam quisque. Massa ultricies mi quis
                            hendrerit dolor magna eget est lorem. Erat imperdiet
                            sed euismod nisi porta. Lectus vestibulum mattis
                            ullamcorper velit.
                        </p>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
            <Outlet></Outlet>
        </div>
    );
};

export default Dashboard;
