import { Link } from 'react-router-dom'
export default function Success() {
 
  return (
    <div>
        <div style={{textAlign:"center"}}>
        <p className="b-3">Verification Complete</p>
          <p style={{ color: "green" }}>
          Thank you for verifying your details with us, You'll be redirected
            to the home page.
          </p>
          <Link to={"/"} target="_blank">Go home</Link>
        </div>
    </div>
  )
}
