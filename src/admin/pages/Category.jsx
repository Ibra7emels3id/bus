import axios from 'axios'
import MainNavbar from '../_Components/MainNavbar'
import Header from '../_Components/Header'
import { useEffect, useState } from 'react';
import ItemCategory from '../_Components/itemCategory';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { toast } from 'react-toastify';



const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));


export default function Category() {
    const [category, setCategory] = useState([])

    // fetch the category Api
    useEffect(() => {
        const FetchCategory = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_SOME_URL}/api/categorys`)
                setCategory(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        FetchCategory()
    }, [])

    // delete category
    const HandleDeleteChange = async (id) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            try {
                await axios.delete(`${import.meta.env.VITE_SOME_URL}/api/category/delete/${id}`)
                console.log('Category deleted successfully');
                setCategory(category.filter((cat) => cat._id !== id));
                toast.success(`Category deleted successfully`);
            } catch (error) {   
                console.error(error);
                toast.error(`Error deleting category`);
            }
        }
    }

    const AllCategory = category?.map((it) => {
        return ( 
                <ItemCategory key={it._id} onDelete={HandleDeleteChange} image={it.image} title={it.title} id={it._id} time={it.time} date={it.date} />
        )
    })


    return (
        <>
            <Header />
            <div className="flex">
                <MainNavbar />
                <div className="container">

                    <div className='p-5'>
                        <h1 className='py-4 text-3xl text-[#6d28d9] font-medium'>Category Page</h1>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell align='center' width={120}>Image</StyledTableCell>
                                        <StyledTableCell align="center" width={100}>Title Category</StyledTableCell>
                                        <StyledTableCell align="center" width={100}>date</StyledTableCell>
                                        <StyledTableCell align="center" width={50}>View</StyledTableCell>
                                        <StyledTableCell align="center" width={50}>Update</StyledTableCell>
                                        <StyledTableCell align="center" width={50}>Delete</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {AllCategory}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            </div>
        </>
    )
}
