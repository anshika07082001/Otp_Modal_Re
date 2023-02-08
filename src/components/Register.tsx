import React, { useState } from "react";
import OtpLayout from "./ OtpLayout";

const Register = () => {
  var [num, setNum] = useState<any>();
  var [otp, setOtp] = useState<number | undefined>();
  var [msg, setMsg] = useState("");
  var [open, setOpen] = useState<boolean>(false);

  // functions takes the input value from user to generate the otp
  const inpHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.match(/^[4-8]{1}$/)) {
      setMsg("");
      setNum(Number(e.target.value));
    } else {
      setMsg("input must be filled in range of 4 to 8");
    }
  };

  // function generates the random number
  const generateOtp = () => {
    if (num !== undefined && msg == "") {
      var max = "";
      var min = "1";
      for (var i = 1; i <= num; i++) {
        max += 9;
        if (i !== 1) {
          min += 0;
        }
      }
      var OTP = Math.floor(
        Math.random() * (parseInt(max) - parseInt(min)) + parseInt(min)
      );
      setOtp(OTP);
      setOpen(true);
    } else {
      setMsg("Please fill input with range 4-8");
    }
  };

  return (
    <div className="displayColumn">
      <h1>OTP Validation</h1>
      <div className="displayRow displayRow--userNum">
        <label>
          Enter the number to get otp(Range will be: 4-8):&nbsp;&nbsp;
        </label>
        <input
          className="userNum__inp"
          maxLength={1}
          minLength={1}
          type="text"
          onChange={(e) => inpHandler(e)}
        />
      </div>
      <label className="errorText">{msg}</label>
      <button className="button" onClick={generateOtp}>
        Validate OTP
      </button>
      {/* Rendering of Otp Modal Component*/}
      {open ? (
        <OtpLayout
          open={open}
          setOpen={setOpen}
          otp={otp}
          generateOtp={generateOtp}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Register;
