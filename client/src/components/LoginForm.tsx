import { useContext, useState } from "react"
import { Context } from "..";
import { observer } from "mobx-react-lite";

const LoginForm: React.FC = () => {
  const [ email, setEmail ] = useState<string>("");
  const [ password, setPassword ] = useState<string>("");
  const { store } = useContext(Context)

  return (
    <div>
      <input 
        type="text" 
        placeholder="Email" 
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input 
        type="text" 
        placeholder="Password" 
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={() => store.login(email, password)}>
        Sign In
      </button>
      <button onClick={() => store.registration(email, password)}>
        Sign Up
      </button>
    </div>
  )
}

export default observer(LoginForm);