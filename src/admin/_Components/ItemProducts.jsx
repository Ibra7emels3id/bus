import React from 'react';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


const ItemProducts = ({title , date , description ,quantity, image ,time, id , category , onDelete }) => {
        const Navigate = useNavigate()
    
    return (
        <>
            <StyledTableRow className='flex items-center justify-center' key={id}>
                <StyledTableCell sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><img className='w-[150px] flex items-center justify-center rounded-xl' src={`http://localhost:3000/${image}`} alt={title} /></StyledTableCell>
                <StyledTableCell align="center">{title}</StyledTableCell>
                <StyledTableCell align="center">{description.slice(0 , 20)}...</StyledTableCell>
                <StyledTableCell align="center">{quantity}</StyledTableCell>
                <StyledTableCell align="center">{date}<br/>{time}</StyledTableCell>
                <StyledTableCell align="center" ><span onClick={() => {
                    Navigate(`/admin/product/details/${id}`)
                }} className='bg-[#dedede] p-4 rounded-xl'><VisibilityIcon sx={{ fontSize: '30px' }} className=' cursor-pointer ' /></span></StyledTableCell>
                <StyledTableCell align="center"><span onClick={() => {
                    Navigate(`/admin/product/update/${id}`)
                }} className='bg-[#dedede] p-4 rounded-xl'><EditNoteIcon sx={{ fontSize: '30px', color: 'green' }} className=' cursor-pointer ' /></span></StyledTableCell>
                <StyledTableCell align="center"><span onClick={() => {
                    onDelete(id)
                }} className='bg-[#dedede] p-4 rounded-xl'><DeleteIcon sx={{ fontSize: '30px', color: 'red' }} className=' cursor-pointer ' /></span></StyledTableCell>
            </StyledTableRow>
        </>
    );
}

export default ItemProducts;
