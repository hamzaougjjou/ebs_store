import React from 'react'
import "./../../../assets/css/productReport.css"
function Report() {
    return (
        <div id="report">
            <h2>Report a propleme</h2>

            <form>
                <label htmlFor='email'>Emaill : </label>
                <input type='email' name='email' placeholder='inser your email ...'/>
                <label htmlFor='problem'>Problem : </label>
                <textarea name='problem' placeholder="what's the probleme"></textarea>
                <button type='submit'>Send</button>
            </form>
        </div>
    )
}

export default Report