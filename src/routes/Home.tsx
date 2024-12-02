import { useState } from 'react';
import Search from '../components/Search/Search'
import { UserProps } from '../types/user';
import User from '../components/User/User';
import Error from '../components/Error/Error';

const Home = () => {

  const [user, setUser] = useState<UserProps | null>(null);
  const [error, setError] = useState<boolean>(false);

  const clearScreen = () => {
    setError(false)
    setUser(null)
  }

  const loadUser = async(userName: string) => {

    clearScreen()
    
    const request = await fetch(`https://api.github.com/users/${userName}`)

    const data = await request.json();

    if(request.status === 404){
      setError(true)
      return;
    }

    const { avatar_url, login, location, followers, following } = data;

    const userData: UserProps = {
      avatar_url,
      login,
      location,
      followers,
      following
    };

    setUser(userData)

  }

  return (
    <div>
      <Search loadUser={loadUser}/>
      {error && <Error/>}
      {user && <User {...user}/>}
    </div>
  )
}

export default Home