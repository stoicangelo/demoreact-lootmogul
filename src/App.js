import logo from './logo.svg';
import './App.css';
import data from './data/user_dumps';
import { useState } from 'react';

function App() {

  const [calculated, setCalculated] = useState(false);
  const [modifiedData, setModifiedData] = useState(null);
  const [modifyBtnDisabled, setModifyBtnDisabled] = useState(false);
  


  const modifyUserData = () => {

    let usersNew = [];
    for (const user of data) {
      usersNew.push(fetchModifiedUser(user, 1));
    }
    alert("Modification done. Please click on download to retrieve data");
    setModifiedData(usersNew);
    setCalculated(true);
    setModifyBtnDisabled(true);
    console.log(JSON.stringify(usersNew));
  }

  const fetchModifiedUser = (obj, level) => {
    //recursively calculate and update for deep_childrens
    let deepChildrensNew = [];
    for (const deepChild of obj.deep_childrens) {
      deepChildrensNew.push(fetchModifiedUser(deepChild, level + 1));
    }
    //calculated the total staked amount for the user
    const totalStaked = obj.pools.reduce((accumulator, pool) => {
      return accumulator + parseFloat(pool.staked_amount);
    }, 0);
    let objNew = {
      address: obj.address,
      parent_address: obj.parent_address,
      pools: obj.pools,
      deep_childrens: deepChildrensNew,
      total_childs: obj.total_childs,
      level,
      total_staked: totalStaked
    }
    return objNew;
  }

  const downloadHandler = () => {
    console.log("her we are getting downloaded");
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={modifyUserData} disabled={modifyBtnDisabled}> MODIFY </button>
        {calculated &&
          <a
            href={`data:text/json;charset=utf-8,${encodeURIComponent(
              JSON.stringify(modifiedData)
            )}`}
            download="file.json"
          >
            {`Download`}
          </a>
        }
      </header>
    </div>
  );
}

export default App;
