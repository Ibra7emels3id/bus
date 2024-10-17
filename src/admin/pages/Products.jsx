import React, { useEffect, useState } from 'react';
import MainNavbar from '../_Components/MainNavbar';
import Header from '../_Components/Header';
import { styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow } from '@mui/material';
import Paper from '@mui/material/Paper';
import ItemProducts from '../_Components/ItemProducts';
import axios from 'axios';




const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));


const Products = () => {
    const [products, setProducts] = useState([])


    // Fetch the products
    const fetchProducts = async () => {
        const response = await fetch(`${import.meta.env.VITE_SOME_URL}/api/products`);
        const data = await response.json();
        setProducts(data);
    }


    // Delete the item Product
    const deleteProduct = async (id) => {
        if (window.confirm('Are you sure you want to delete')) {
            try {
                axios.delete(`http://localhost:3000/api/product/delete/${id}`)
                setProducts(products.filter((it) => it._id !== id))
            } catch (error) {
                console.error('Error deleting product:', error);
            }
        }
    };



    // Get products Api
    const AllProducts = products?.map((it) => {
        return (
            <ItemProducts onDelete={deleteProduct} id={it._id} quantity={it.quantity} key={it._id} title={it.title} description={it.description} date={it.date} time={it.time} image={it.image} />
        )
    })


    useEffect(() => {
        fetchProducts()
    }, []);

    return (
        <>
            <Header />
            <div className="flex">
                <MainNavbar />
                <div className=" w-calc-100-80 md:w-calc-100-280">
                    <div className='p-5 w-full'>
                        <h1 className='py-4 text-3xl text-[#6d28d9] font-medium'>Products Page</h1>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 900 }} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell align='center' width={120}>Image</StyledTableCell>
                                        <StyledTableCell align="center" width={100}>Title</StyledTableCell>
                                        <StyledTableCell align="center" width={100}>description</StyledTableCell>
                                        <StyledTableCell align="center" width={100}>Quantity</StyledTableCell>
                                        <StyledTableCell align="center" width={100}>date</StyledTableCell>
                                        <StyledTableCell align="center" width={50}>View</StyledTableCell>
                                        <StyledTableCell align="center" width={50}>Update</StyledTableCell>
                                        <StyledTableCell align="center" width={50}>Delete</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {AllProducts}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Products;
