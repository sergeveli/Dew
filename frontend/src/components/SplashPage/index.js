import React, { useState, useEffect } from 'react';
import './SplashPage.css'

function SplashPage(){
    return <div className='splash-container'>
        <h1>GOT TO SEE IT THROUGH, MY BOY</h1>
        <div className='description-box'>
        <p>Whether writing out a To Do list or grouping tasks for larger projects, Dew is the perfect task manager for the everyday person.</p>
        </div>
        <p>See What's Next. Dew What's Next.</p>
        <p><a href="https://github.com/sergeveli"> GitHub</a> &nbsp;
        <a href="https://www.linkedin.com/in/sergekassangana/">LinkedIn</a>
        </p>
    </div>

}

export default SplashPage