import "./SplashPage.css"

const SplashPage = () => {
  return (
    <div id="splashContent">
      <div className="splashDiv">
        <div className="splashHead">
          <h1>Welcome!</h1>
          <h2>Lets Vibe</h2>
        </div>
        <div className="splashBtn">
          <button>Log in</button>
        </div>
        <div className="splashBtn">
          <button>Sign Up</button>
        </div>
        <div className="splashBtn">
          <button>Demo User</button>
        </div>
      </div>
    </div>
  )
}

export default SplashPage
