import React from 'react'
import { Link } from 'react-router-dom'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import GroupIcon from '@mui/icons-material/Group';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import CategoryIcon from '@mui/icons-material/Category';
import ControlPointDuplicateIcon from '@mui/icons-material/ControlPointDuplicate';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import EditIcon from '@mui/icons-material/Edit';
export default function MainNavbar() {
    return (
        <>
            <nav className="w-[80px] md:w-[280px] bg-[#f5f5f5] flex pt-10  justify-center h-screen">
                <ul className='flex flex-col gap-5 w-full px-5'>
                    <li className='w-full'><Link className='bg-[#fff] px-3 py-2 rounded-3xl w-full text-center flex items-center justify-center' to="/admin"><AdminPanelSettingsIcon className='mx-2' /> <span className=' hidden md:block'>Dashboard</span></Link></li>
                    <li className='w-full'><Link className='bg-[#fff] px-3 py-2 rounded-3xl w-full text-center flex items-center justify-center' to="/admin/users"><GroupIcon className='mx-2' /><span className=' hidden md:block'>Users</span></Link></li>
                    <li className='w-full'><Link className='bg-[#fff] px-3 py-2 rounded-3xl w-full  text-center flex items-center justify-center' to="/admin/adduser"><GroupAddIcon className='mx-2' /><span className=' hidden md:block'>AddUser</span></Link></li>
                    <li className='w-full'><Link className='bg-[#fff] px-3 py-2 rounded-3xl w-full  text-center flex items-center justify-center' to="/admin/category"><CategoryIcon className='mx-2' /><span className=' hidden md:block'>Category</span></Link></li>
                    <li className='w-full'><Link className='bg-[#fff] px-3 py-2 rounded-3xl w-full  text-center flex items-center justify-center' to="/admin/AddCategory"><ControlPointDuplicateIcon className='mx-2' /><span className=' hidden md:block'>AddCategory</span></Link></li>
                    <li className='w-full'><Link className='bg-[#fff] px-3 py-2 rounded-3xl w-full  text-center flex items-center justify-center' to="/admin/Products"><ProductionQuantityLimitsIcon className='mx-2' /><span className=' hidden md:block'>Products</span></Link></li>
                    <li className='w-full'><Link className='bg-[#fff] px-3 py-2 rounded-3xl w-full  text-center flex items-center justify-center' to="/admin/addproduct"><AddToPhotosIcon className='mx-2' /><span className=' hidden md:block'>AddProduct</span></Link></li>
                    <li className='w-full'><Link className='bg-[#fff] px-3 py-2 rounded-3xl w-full  text-center flex items-center justify-center' to="/admin/settings"><EditIcon className='mx-2' /><span className=' hidden md:block'>settings</span></Link></li>
                </ul>
            </nav>
        </>
    )
}
