// logMgr.js




export class LogMgr {

    btimestap = false;
     
    log(text)
    {
        
        console.log(this.getTimestamp() + text);
    }

    error(text)
    {
        
        console.error(this.getTimestamp() + text);
    }

    getTimestamp()
    {
        if(this.btimestap)
        {
            const local = new Date().toLocaleString();
            return `[${local}] `;
        }

        return "";
    }
}
