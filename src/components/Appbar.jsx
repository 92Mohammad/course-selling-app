export const Appbar = () => {
    return (
        <nav 
            style = {
                {display : 'flex',
                 alignItems: 'center', 
                 justifyContent: 'space-between', 
                 paddingLeft: '20px',
                 paddingRight: '30px',
                 background: "white", 
                 height: '60px'
                }
            }
        > 
            <div className="left-header">
                <h1 style = {{margin: 0}}>Logo</h1>
            </div>
            <div className="right-header">
                <button className="">Signin</button>
                <button>Signup</button>
            </div>  
        </nav>
    )
}