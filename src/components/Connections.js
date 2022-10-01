import React from 'react'
import CreateIcon from '@material-ui/icons/Create';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import { Button } from "@material-ui/core";
import Popups from "./Popups";


import PermIdentityIcon from '@material-ui/icons/PermIdentity';import './Connections.css';

const Connections = () => {
    // var state = { data : "Hello World" } 
  return (
        <>
        <div className="connects">
            <div className="name_tag">
                <h2>
                Connections 👩👨

                </h2>
            </div>
            <div className="connects-form">
                <form action="#" method="post">
                    <div className="form-group">
                        <label htmlFor="formName" className="d-block">
                            <PermIdentityIcon className='icon'/>

                        </label>
                        <input type="text" id="formName" className="form-control " placeholder="Name" autoFocus="autofocus"/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="formEmail" className="d-block">
                            <MailOutlineIcon className='icon'/>
                        </label>
                        <input type="text" id="formEmail" className="form-control " placeholder="Email"/>
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="formMessage" className="d-block">
                            <CreateIcon className='icon'/>
                        </label>
                        <textarea rows="15" cols="78" type="text" id="formMessage"  placeholder="Message.."/>
                    </div>
                    <div className="form-group jc-flex-end">
                    <Popups Text="This Section is still under construction but you email me on jack@user64bit.world"/>

                    {/* <Button variant="outlined" className="sidebar__tweet contact_btn" fullWidth>
        Tweet
      </Button> */}
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}

export default Connections