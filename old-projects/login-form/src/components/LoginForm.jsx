function LoginForm({showPassword,setShowPassword}){

  function showOrHidePassword(){
    setShowPassword(!showPassword);
  }

  return (
      <>
          <p className="para">Hello, welcome to my website</p>
          <div className="input-box">
              <input type="text" name="" id="" placeholder="Email" className="box"/>
              <div className="password-box">
                  <input type={showPassword?"password":"text"} name="" id="" placeholder="Password" className="box"/>
                  <button className="hide-button" 
                      onClick={showOrHidePassword}
                  >{showPassword?"show":"hide"}</button>
              </div>
          </div>
          <div className="button-div">
              <button>Login</button>
              <button>Sign up</button>
          </div>
      </>
  )
}

export default LoginForm;