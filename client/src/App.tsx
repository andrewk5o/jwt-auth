import { useContext, useEffect, useState } from "react";
import { Context } from ".";
import LoginForm from "./components/LoginForm";
import { observer } from "mobx-react-lite";
import { IUser } from "./models/IUser";
import UserService from "./services/UserService";

const App: React.FC = () => {
  const { store } = useContext(Context);
  const [ users, setUsers ] = useState<IUser[]>([]);

  const getUsers = async() => {
    try {
      const response = await UserService.fetchUsers();
      setUsers(response.data);
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth();
    }
  }, [store])

  if (store.isLoading) {
    return <div>Loading...</div>
  }

  if (!store.isAuth) {
    return (
      <>
        <LoginForm />
        <div>
          <button onClick={() => getUsers()}>Get Users</button>
        </div>
      </>
    )
  }

  return (
    <div className="App">
      <h4>{store.isAuth ? `User ${store.user.email} is authorized` : "User unauthorized"}</h4>
      <h4>{store.user.isActivated ? `Account ${store.user.email} is activated` : "Please activate account"}</h4>
      <button onClick={() => store.logout()}>Logout</button>
      <div>
        <button onClick={() => getUsers()}>Get Users</button>
      </div>
      {users.map(user => {
        return <div key={user.email}>{user.email}</div>
      })}
    </div>
  );
}

export default observer(App);
