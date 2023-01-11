import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './App.css'

const Form = () => {
  const [occupations, setOccupations] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedOccupation, setSelectedOccupation] = useState('');
  const [selectedState, setSelectedState] = useState('');

  useEffect(() => {
    // Fetch the list of occupations and states from the API
    axios.get('https://frontend-take-home.fetchrewards.com/form')
      .then(response => {
        setOccupations(response.data.occupations);
        setStates(response.data.states);
      })
      .catch(error => console.log(error));
  }, []);

  const handleSubmit = event => {
    event.preventDefault();

    // Send the selected occupation and state to another API
    axios.post('https://frontend-take-home.fetchrewards.com/form', {
      occupation: selectedOccupation,
      state: selectedState,
    })
      .then(response => console.log(response))
      .catch(error => console.log(error));
  };

  return (

    <div className={styles.formContainer}>
      <h1 id='heading1'>Fetch Rewards</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input id='in' type="text" name="name" required />
        </label>
        <br />
        <label>
          Email:
          <input id='in' type="email" name="email" required />
        </label>
        <br />
        <label>
          Password:
          <input id='in' type="password" name="password" required />
        </label>
        <br />
        <label>
          Occupation:
          <select id='int' onChange={e => setSelectedOccupation(e.target.value)}>
            {occupations.map(occupation => (
              <option key={occupation} value={occupation}>
                {occupation}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          State:
          <select id='int' onChange={e => setSelectedState(e.target.value)}>
            {states.map(state => (
              <option key={state.abbreviation} value={state.abbreviation}>
                {state.name}
              </option>
            ))}
          </select>
        </label>
        <br />
        <button type="submit" id='submit'>Submit</button>
      </form>
    </div>
  );
};

export default Form;
