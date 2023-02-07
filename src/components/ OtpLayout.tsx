import { Box, Modal } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'

const style = {position: 'absolute',top: '50%',left: '50%',transform: 'translate(-50%, -50%)',width: 500,bgcolor: 'background.paper',boxShadow: 24,p: 2,};

type otpprops={
    open:boolean;
    setOpen:React.Dispatch<React.SetStateAction<boolean>>;
    otp:number|undefined;
    generateNum:()=>void
}

const  OtpLayout = (props:otpprops) => {
    var [sec,setSec]=useState(10)
    var [stateObj,setStateObj]=useState({border:'',textColor:'',msg:''})
    var [limitDisable,setLimitDisable]=useState({limit:4,disabled:true})
    var timerInterval=useRef<any>()
    var inpRefs=useRef<any>([])

    useEffect(()=>{
        clearInterval(timerInterval.current)
        timerInterval.current=setInterval(timer,1000)
        if(sec==0)
        setLimitDisable({limit:limitDisable.limit,disabled:false})
    },[sec])

    useEffect(()=>{
        setTimeout(()=>inpRefs.current[0].focus(),100)
    },[limitDisable.limit])

    const timer=()=>{
        if(sec>0){
            sec--
            setSec(sec)
        }
    }

    const closeModal=()=>{
        props.setOpen(false)
    }

    const inpHandler=(e:React.ChangeEvent<HTMLInputElement>,i:number)=>{
        var arr:any=[]
        setStateObj({border:'',textColor:'',msg:''})
        if(e.target.value.match(/^[0-9]{1}$/)){
            inpRefs.current[i].value=e.target.value
            var ele = e.target
            var nextSibling:any = ele.nextElementSibling
            if(nextSibling!==null)
            nextSibling?nextSibling.focus():ele.blur()
            var count:boolean=true;
            inpRefs.current.map((item:any)=>{
                if(item.value==''){
                    count=false;
                }
            })
            if(count){
                inpRefs.current.map((item:any)=>{
                    arr.push(item.value)
                })
                if(arr.join('')==props.otp){
                    setStateObj({border:'successBorder',textColor:'successText',msg:'Matched successfully'})
                   setTimeout(()=>{setStateObj({border:'successBorder',textColor:'successText',msg:''})},2000) 
                   setTimeout(()=>props.setOpen(false),1000)
                }
                else{
                    setStateObj({border:'errorBorder',textColor:'errorText',msg:'otp entered is wrong'})
                }
            }
        }
        else{
            inpRefs.current[i].value=''
        }
    } 


    const regenerateNum=()=>{
        if(limitDisable.limit>0){
            limitDisable.limit--
            setLimitDisable({limit:limitDisable.limit,disabled:true})
            // setLimit(limit)
            props.generateNum()
            setSec(10)
            // setLimitDisable({limit:limitDisable.limit,disabled:true})
            // setDisabled(true)
            setStateObj({border:'',textColor:'successText',msg:'One-Time Passcode sent successfully!'})
            setTimeout(()=>setStateObj({border:'',textColor:'successText',msg:''}),2000)
        }
        else{
            setStateObj({border:'',textColor:'errorText',msg:'Limit Exceed'})
        }
        inpRefs.current.map((item:any)=>{
            item.value=''
        })
    }

    const backspace =(e:React.KeyboardEvent<HTMLInputElement>,i:number)=>{
        if(e.key=='Backspace'){
            if(inpRefs.current[i].value==''){
            setTimeout(()=>{
                inpRefs.current[i-1].focus()
            },200)
            }
            if(inpRefs.current[i].value!==''){
                setTimeout(()=>{
                    inpRefs.current[i].focus()
                },200)
            }
        }
    }
    
    return (
    <Modal open={props.open} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
            <div className='displayRow displayRow--modalHeading'>
                <label className='fontSize'>Verify Email Address ({props.otp})</label>
                <button onClick={closeModal} className='button button--danger'><i className="bi bi-x-lg"></i></button>
            </div>
            <hr/>
            <p>Enter Your Code Here:</p>
            <div className='displayRow'>
                {props.otp!==undefined?
                props.otp.toString().split('').map((item,i)=>{
                    return (
                        <input className={`${stateObj.border} inputBox`} type='text' onKeyDown={(e)=>backspace(e,i)}  maxLength={1} minLength={1} onChange={(e)=>inpHandler(e,i)} ref={(ref)=>inpRefs.current[i]=ref}/>
                    )
                })
                :<></>}
                {stateObj.msg=='Matched successfully'?<img className='loader__img' src='https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921' alt=''/>:<></>}
            </div>
            <label className={stateObj.textColor}>{stateObj.msg}</label>
            <div className='displayRow'>
              <button className={limitDisable.disabled?'button--disabled':'button button--enable'} disabled={limitDisable.disabled} onClick={regenerateNum}>Resend One-time Passcode</button>
              <label className={limitDisable.limit==0?'text-danger':'text-dark'}>( {limitDisable.limit} Attempts left)</label>
              <label className='text-danger'>00:{sec==0?'00':sec}</label>
            </div>
        </Box>
    </Modal>
    )
}

export default  OtpLayout