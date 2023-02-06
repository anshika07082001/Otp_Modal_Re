import React, { useRef, useState } from 'react'

const Register = () => {
    var [num,setNum]=useState<any>(5)
    var [msg,setMsg]=useState('')

    const generateNum=()=>{
        console.log(num)
        var nine=9
        
        // console.log(Math.floor(Math.random()*9999+10000))
    }

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

  return (
    <div className='col-12 text-center d-flex flex-column'>
        {/* <form onSubmit={(e)=>submitHandler(e)} className='d-flex flex-column'> */}
        <label>Enter the number to get otp(Range will be: 4-8 default value is 5)</label>
        <input className='col-1 m-auto' maxLength={1} minLength={1} type='text' value={num} onChange={(e)=>inpHandler(e)}/>
        {/* <button type='submit' className='d-none'></button>
        </form> */}
        <label className='text-danger'>{msg}</label>
        <button className=' m-auto btn btn-secondary p-2 col-2 mt-4' onClick={generateNum}>Validate OTP</button>
    </div>
  )
}

export default Register