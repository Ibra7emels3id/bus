import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import bgImage from '../assets/logo.png'; // ضع خلفية مناسبة هنا
import axios from 'axios';

const TicketDownload = ({ open, handleClose, IDCart }) => {
    const [reservations, setreservations] = useState({})
    const [loading, setloading] = useState(false);



    // Get All Reservations
    const getReservations = async () => {
        try {
            setloading(true);
            const response = await axios.get(`${import.meta.env.VITE_SOME_URL}/api/payment`)
            const FilterData = response?.data?.find((it) => it?._id === IDCart)
            setreservations(FilterData)
            setloading(false);
        } catch (error) {
            console.error(error)
        } finally {
            setloading(false);
        }
    }


    console.log(reservations);

    console.log(IDCart);
    const downloadPDF = () => {
        const doc = new jsPDF('landscape', 'mm', 'a4');

        // doc.bg('#000', 0, 0, 297, 210);
        doc.setFillColor(0, 0, 0);

        doc.setFontSize(22);
        doc.setTextColor('#333333');
        doc.text('BOARDING PASS', 20, 30);

        doc.setFontSize(16);
        doc.setTextColor('#000000');

        doc.text(`Name: ${reservations?.name}`, 20, 50);
        doc.text(`Form - To: ${reservations?.from} - ${reservations?.to} `, 20, 65);
        doc.text(`Date: ${reservations?.date}`, 20, 80);

        doc.text(`In Time: ${reservations?.inTime}`, 20, 95);
        doc.text(`Out Time: ${reservations?.outTime}`, 20, 110);

        doc.setFontSize(14);
        doc.text('Scan for boarding', 230, 180);
        doc.addImage(bgImage, 'PNG', 220, 140, 50, 50);

        doc.save('boarding_pass.pdf');
        handleClose();
    };

    // Use Effect 
    useEffect(() => {
        getReservations();

    }, [IDCart]);


    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="draggable-dialog-title"
        >
            <DialogTitle style={{ cursor: 'move', fontSize: '30px', margin: '10px 0' }} id="draggable-dialog-title">
                Download Boarding Pass
            </DialogTitle>
            <DialogContent>
                <div className="flex flex-col gap-4 w-full md:w-[500px]">
                    <p>Your ticket is ready. Click the button below to download your boarding pass.</p>
                </div>
            </DialogContent>
            <DialogActions>
                <div className="flex flex-col md:flex w-full my-5 px-10 gap-6">
                    <button
                        onClick={downloadPDF}
                        className="bg-blue-500 w-full text-white py-2 px-4 rounded-lg">
                        Download Boarding Pass
                    </button>
                    <button className='w-full bg-yellow-300 hover:bg-yellow-500 h-12 text-white' autoFocus onClick={handleClose}>
                        Cancel
                    </button>
                </div>
            </DialogActions>
        </Dialog>
    );
};

export default TicketDownload;
