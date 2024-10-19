import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.png';
import { ContextData } from '../context/ContextApi';
import HomeIcon from '@mui/icons-material/Home';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import InfoIcon from '@mui/icons-material/Info';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';


export default function AlertLinks({ open, toggleDrawer }) {
    const { UserData } = React.useContext(ContextData)


    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
            <List className='flex flex-col gap-5'>
                <Link to={"/"} className=''>
                    <img src={Logo} alt="logo" className="w-36 pl-4 py-2 h-auto object-contain" />
                </Link>
                <ListItem sx={{marginTop:'12px'}} disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <li>
                                <Link to={'/'} className='text-neutral-600 flex items-center justify-center gap-1 text-1xl font-medium ' ><HomeIcon/>Home</Link>
                            </li>
                        </ListItemIcon>
                        <ListItemText />
                    </ListItemButton>
                </ListItem>
                {UserData.role === 'user' && (
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <>
                                    <li>
                                        <Link to={'/reservations'} className='text-neutral-600 font-medium flex gap-1 items-center text-1xl justify-center ' ><EventSeatIcon/>Reservations</Link>
                                    </li>
                                </>
                            </ListItemIcon>
                            <ListItemText />
                        </ListItemButton>
                    </ListItem>
                )}
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <li>
                                <Link to={'/about'} className='text-neutral-600 font-medium flex gap-1 items-center text-1xl justify-center ' ><InfoIcon/>About Us</Link>
                            </li>
                        </ListItemIcon>
                        <ListItemText />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <li>
                                <Link to={'/bus'} className='text-neutral-600 font-medium flex gap-1 items-center text-1xl justify-center ' ><DirectionsBusIcon/>Bus</Link>
                            </li>
                        </ListItemIcon>
                        <ListItemText />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <li>
                                <Link to={'/services'} className='text-neutral-600 font-medium flex gap-1 items-center text-1xl justify-center ' ><MiscellaneousServicesIcon/>Services</Link>
                            </li>
                        </ListItemIcon>
                        <ListItemText />
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />
            {/* <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List> */}
        </Box>
    );

    return (
        <div>
            <Drawer open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </div>
    );
}
