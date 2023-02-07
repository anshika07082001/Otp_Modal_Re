import React, { useState } from 'react'
import OtpLayout from './ OtpLayout'

const Register = () => {
    var [num,setNum]=useState<any>(5)
    var [otp,setOtp]=useState<number|undefined>()
    var [msg,setMsg]=useState('')
    // var [keyVal,setKeyVal]=useState({num:5,otp:})
    var [open,setOpen]=useState<boolean>(false)

    const inpHandler=(e:React.ChangeEvent<HTMLInputElement>)=>{
        if(e.target.value.match(/^[4-8]{1}$/)){
            setMsg('')
            setNum(e.target.value)
        }
        else{
            if(e.target.value=='')
            setNum(e.target.value)
            setMsg('Number must be less than and equal to 8 or greater than and equal to 4')
        }
    }

    const openModal=()=>{
        generateNum()
        if(num!=='')
        setOpen(true)
    }

    const generateNum=()=>{
        if(num!==''){
            var max=''
            var min='1'
            for(var i=1;i<=num;i++){
                max+=9
                if(i!==1){
                    min+=0
                }
            }
            var OTP=Math.floor(Math.random()*(parseInt(max)-parseInt(min))+parseInt(min))
            setOtp(OTP)
        }
    }

    return (
    <div className='displayColumn'>
        <h1>OTP Validation</h1>
        <div className='displayRow displayRow--userNum'>
            <label>Enter the number to get otp(Range will be: 4-8 default value is 5):&nbsp;&nbsp;</label>
            <input className='userNum__inp' maxLength={1} minLength={1} type='text' value={num} onChange={(e)=>inpHandler(e)}/>
        </div>
        <label className='errorText'>{msg}</label>
        <button className='button' onClick={openModal}>Validate OTP</button>
        {open?<OtpLayout open={open} setOpen={setOpen} otp={otp} generateNum={generateNum}/>:<></>}
    </div>
    )
}

export default Register