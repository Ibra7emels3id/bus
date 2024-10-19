import { Paper, Rating } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Draggable from 'react-draggable';
import { ContextData } from '../context/ContextApi';
import { useContext, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';



const ShowDialog = ({ open, handleClose }) => {
    const { UserData } = useContext(ContextData);
    const [formData, setFormData] = useState({
        description: '',
        star: 0
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const HandleSubmitData = async () => {
        //Submit your form data here
        const data = {
            name: UserData?.user?.name,
            email: UserData?.user?.email,
            description: formData.description,
            star: formData.star
        }

        // Send data to server
        try {
            const res = await axios.post(`${import.meta.env.VITE_SOME_URL}/api/review`, data)
            console.log(res.data)
            toast.success('Review added successfully')
            setFormData({
                description: '',
                star: 0
            })
        } catch (error) {
            console.error(error)
        }
        handleClose()
    }


    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="draggable-dialog-title"
            >
                <DialogTitle style={{ cursor: 'move', fontSize: '30px', margin: '10px 0' }} id="draggable-dialog-title">
                    Add a review about our work
                </DialogTitle>
                <DialogContent>
                    <div className="flex flex-col gap-4 w-full md:w-[500px]">
                        <input value={UserData?.user?.name} className='w-full h-12 border p-3 focus:outline-none ' type="text" name="name" id="name" placeholder='Enter Your Name' />
                        <input value={UserData?.user?.email} className='w-full h-12 border p-3 focus:outline-none ' type="text" name="name" id="name" placeholder='Enter Your Email' />
                        <textarea onChange={handleChange} className='w-full h-28 border p-3 focus:outline-none ' name="description" id="description" placeholder='Enter Your Description'></textarea>
                        <div className="flex gap-4">
                            <Rating onChange={handleChange} name="star" defaultValue={formData.star} />
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <div className="flex w-full my-5 px-10 gap-6">
                        <button className='w-full bg-yellow-300 hover:bg-yellow-500 h-12 text-white' autoFocus onClick={handleClose}>
                            Cancel
                        </button>
                        <button className='w-full h-12 bg-violet-600 hover:bg-violet-800 text-white' onClick={HandleSubmitData}>Subscribe</button>
                    </div>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default ShowDialog;
