import { Box, Modal } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

// inline css for modal
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
};
// types are defined
type otpprops = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  otp: number | undefined;
  generateOtp: () => void;
};

const OtpLayout = (props: otpprops) => {
  var [sec, setSec] = useState(59);
  var [stateObj, setStateObj] = useState({
    border: "",
    textColor: "",
    msg: "",
  });
  var [limitDisable, setLimitDisable] = useState({ limit: 4, disabled: true });
  var timerInterval = useRef<any>();
  var inpRefs = useRef<any>([]);

  // useEffect runs when second changes
  useEffect(() => {
    clearInterval(timerInterval.current);
    timerInterval.current = setInterval(timer, 1000);
    if (sec === 0 && limitDisable.limit > 0) {
      setLimitDisable({ limit: limitDisable.limit, disabled: false });
    }
  }, [sec]);
  // useEffect runs when limit changes and set to focus to input first element
  useEffect(() => {
    setTimeout(() => inpRefs.current[0].focus(), 100);
  }, [limitDisable.limit]);
  // timer function decrements the seconds value
  const timer = () => {
    if (sec > 0) {
      sec--;
      setSec(sec);
    }
  };
  // function closes the modal
  const closeModal = () => {
    props.setOpen(false);
  };
  // onchange input handler
  const inpHandler = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
    var arr: any = [];
    setStateObj({ border: "", textColor: "", msg: "" });
    if (e.target.value.match(/^[0-9]{1}$/)) {
      inpRefs.current[i].value = e.target.value;
      if (inpRefs.current[i].value !== "" && inpRefs.current[i + 1] !== undefined) {
        inpRefs.current[i + 1].focus();
      }
      var count: boolean = true;
      inpRefs.current.map((item: any) => {
        if (item.value === "") {
          count = false;
        }
      });
      if (count) {
        inpRefs.current.map((item: any) => {
          arr.push(item.value);
        });
        if (parseInt(arr.join("")) === props.otp) {
          setStateObj({
            border: "successBorder",
            textColor: "successText",
            msg: "Matched successfully",
          });
          setTimeout(() => {
            setStateObj({
              border: "successBorder",
              textColor: "successText",
              msg: "",
            });
          }, 2000);
          setTimeout(() => props.setOpen(false), 1000);
        } else {
          setStateObj({
            border: "errorBorder",
            textColor: "errorText",
            msg: "Entered One-time passcode is incorrect!",
          });
        }
      }
    } else {
      inpRefs.current[i].value = "";
    }
  };
  // function regenerates the otp
  const regenerateOtp = () => {
    if (limitDisable.limit > 0) {
      limitDisable.limit--;
      setLimitDisable({ limit: limitDisable.limit, disabled: true });
      props.generateOtp();
      setSec(59);
      setStateObj({
        border: "",
        textColor: "successText",
        msg: "One-Time Passcode sent successfully!",
      });
      setTimeout(
        () => setStateObj({ border: "", textColor: "successText", msg: "" }),
        2000
      );
    }
    inpRefs.current.map((item: any) => {
      item.value = "";
    });
  };
  // Function deletes the value and moves the focus to previous element
  const backspace = (e: React.KeyboardEvent<HTMLInputElement>, i: number) => {
    if (e.key === "Backspace") {
      if (inpRefs.current[i].value === "") {
        if (i !== 0) {
          inpRefs.current[i - 1].focus();
        }
      }
    }
  };

  return (
    <Modal
      open={props.open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="displayRow displayRow--modalHeading">
          <label className="fontSize">Verify Email Address ({props.otp})</label>
          <button onClick={closeModal} className="button button--danger">
            X
          </button>
        </div>
        <hr />
        <p>Enter Your Code Here:</p>
        <br />
        <div className="displayRow">
          {/* code renders input box dynamically */}
          {props.otp !== undefined ? (
            props.otp
              .toString()
              .split("")
              .map((item, i) => {
                return (
                  <input
                    className={`${stateObj.border} inputBox`}
                    type="text"
                    onKeyDown={(e) => backspace(e, i)}
                    maxLength={1}
                    minLength={1}
                    onChange={(e) => inpHandler(e, i)}
                    ref={(ref) => (inpRefs.current[i] = ref)}
                  />
                );
              })
          ) : (
            <></>
          )}
          {/* Renders the loader */}
          {stateObj.msg === "Matched successfully" ? (
            <img
              className="loader__img"
              src="https://media.tenor.com/8KWBGNcD-zAAAAAC/loader.gif"
              alt=""
            />
          ) : (
            <></>
          )}
        </div>
        <label className={stateObj.textColor}>{stateObj.msg}</label>
        <div className="displayRow">
          {/* code renders the regenerate otp button */}
          <button
            className={
              limitDisable.disabled
                ? "button--disabled"
                : "button button--enable"
            }
            disabled={limitDisable.disabled}
            onClick={regenerateOtp}
          >
            Resend One-time Passcode
          </button>
          <label
            className={
              limitDisable.limit === 0 ? "errorText marginLeft" : "marginLeft"
            }
          >
            ( {limitDisable.limit} Attempts left)
          </label>
          {/* code renders the timer */}
          <label className="errorText marginLeft">
            00:{sec === 0 ? "00" : sec}
          </label>
        </div>
      </Box>
    </Modal>
  );
};

export default OtpLayout;
