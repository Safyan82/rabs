import { useRef, useState } from "react";
import { TextField, Button, DialogActions, Select, MenuItem } from "@mui/material";
import {Scheduler} from "@aldabil/react-scheduler";
import axios, {isCancel, AxiosError} from 'axios';
import './calendar.model.css';
import { CurrencyPound, Mail, Phone, PinDrop, Scale, StraightenSharp, TextDecrease, TextFields } from "@mui/icons-material";
import { Link } from "react-router-dom";
import emailjs from '@emailjs/browser';

const CustomEditor = ({ scheduler }) => {
  const event = scheduler.edited;

  // Make your own form/state
  const [state, setState] = useState({
    title: event?.title || "",
    email: event?.email || "",
    postCode: event?.postCode || "",
    address: event?.address || "0",
    contact: event?.contact,
    description: event?.description,
  });
  const [error, setError] = useState("");
  const [address, setAddress] = useState("0");
  const form = useRef()
  const handleChange = (value, name) => {
    setState((prev) => {
      return {
        ...prev,
        [name]: value
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      scheduler.loading(true);

      /**Simulate remote data saving */
      const added_updated_event = (await new Promise((res) => {
        setTimeout(() => {
          res({
            event_id: event?.event_id || Math.random(),
            title: state.title,
            email: state.email,
            start: scheduler.state.start.value,
            end: scheduler.state.end.value,
            description: state.description,
            contact: state.contact,
            postCode: state.postCode,
            address: state.address
          });
        }, 0);
       
      }));
      emailjs.sendForm('Rabs Flooring', 'template_05i6pcq', form.current , '2GZOCgy0hLViafX67')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
    });
      scheduler.onConfirm(added_updated_event, event ? "edit" : "create");
      scheduler.close();
    } finally {
      scheduler.loading(false);
    }
  };
  const [addressList, setAddressList] = useState([]);
  const [loading, setloading] = useState(false);
  const getAddress = (postcode) => {
    setAddress("0");
    setloading(true);
    axios.get(`https://api.getaddress.io/autocomplete/${postcode}?api-key=sxWFXWF9RkW3lE1xWwc7HQ39121`)
    .then((res) => {setAddressList(res.data.suggestions); 
        setloading(false);
    })
    .catch((err) => console.log(err));

  }
  return (
    <div>
      <form ref={form} onSubmit={handleSubmit}>
      <div style={{ padding: "0rem 1rem", borderBottom:"1px solid #ebebeb", paddingBottom: "4%" }}>
        <p style={{color:"rgba(233, 27, 35)", fontWeight:"bold"}}>BOOK AN APPOINTMENT</p>
        <div style={{display:"flex", columnGap:"15px" }} >
            <TextField
            label="Name"
            value={state.title}
            onChange={(e) => handleChange(e.target.value, "title")}
            error={!!error}
            helperText={error}
            style={{width: "100%"}}
            />
            <TextField
            label="Email"
            type="email"
            value={state.email}
            ref={form}
            onChange={(e) => handleChange(e.target.value, "email")}
            style={{width: "100%"}}            
            />
        </div>
        <div style={{display:"flex",  columnGap:"15px" , marginTop:'4%'}}>
            <TextField
            label="Post code"
            onChange={(e) => { handleChange(e.target.value, "postCode"); getAddress(e.target.value)}}
            error={!!error}
            value={state.postCode}
            helperText={error}
            style={{width: "100%"}}            
            />
            <Select
            type="select"
            placeholder="Select Address"
            style={{width: "100%"}}            
            onChange={(e) => {setAddress(e.target.value); handleChange(e.target.value, "address")}}
            value={loading? "0" : state.address||address}
            >
                <MenuItem   value="0" selected disabled>Select Address </MenuItem>
                {addressList?.map((addr) => (
                    <MenuItem value={addr.address}>{addr.address}</MenuItem>
                ))}
            </Select>
        </div>
        
        <TextField
            label="Contact Number"
            type="number"
            value={state.contact}
            onChange={(e) => handleChange(e.target.value, "contact")}
            fullWidth
            style={{marginTop: '4%'}}
            
        />
        <TextField
            label="Description"
            type="textarea"
            rows={2}
            multiline
            value={state.description}
            onChange={(e) => handleChange(e.target.value, "description")}
            fullWidth
            style={{marginTop: '4%'}}
            
        />

      </div>
      <DialogActions style={{marginTop: "1%"}}>
        <Button onClick={scheduler.close} style={{padding: '10px', background:"#E91B23", color: "white"}}>Cancel</Button>
        <input type="submit" variant="outlined" style={{    padding: '12px', boxSizing: 'border-box', marginLeft: '2px'}} value="Confirm" />
      </DialogActions>
    </form>
    </div>
  );
};

export const Calendar = () => {
  return (
    <Scheduler
      customEditor={(scheduler) => <CustomEditor scheduler={scheduler} />}
      viewerExtraComponent={(fields, event) => {
        return (
          <div>
          <div className="emailDetail">
             <span>
                  <Mail style={{color: "rgb(0, 0, 0, 0.6)"}}/> 
              </span> 
              <span>{event?.email}</span>
          </div>
            <div className="emailDetail">
               <span>
                    <Phone style={{color: "rgb(0, 0, 0, 0.6)"}}/> 
                </span> 
                <span><a href={"tel:"+event?.contact}>{event?.contact}</a></span>
            </div>
            <div className="emailDetail">
               <span>
                    <PinDrop style={{color: "rgb(0, 0, 0, 0.6)"}}/> 
                </span> 
                <span>{event?.address +", " +event?.postCode}</span>
            </div>
            <div className="emailDetail">
               <span>
                    <TextFields style={{color: "rgb(0, 0, 0, 0.6)"}}/> 
                </span> 
                <span>{event?.description}</span>
            </div>
            <div className="emailDetail">
               <span>
                    <StraightenSharp style={{color: "rgb(0, 0, 0, 0.6)"}}/> 
                </span> 
                <span><Link to="/">Ready For Measurement</Link></span>
            </div>
          </div>
        );
      }}
    />
  );
}


