import { Field } from 'formik';
import { useEffect, useState } from 'react';
import { fetchPositions } from 'services/API';

const Positions = ({ getPosition }) => {
  const [positions, setPositions] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState('');
  const [selectedPositionId, setSelectedPositionId] = useState('');
  useEffect(() => {
    (async function asyncFetchPositions() {
      try {
        const response = await fetchPositions();
        setPositions(response);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    getPosition(+selectedPositionId);
  }, [getPosition, selectedPositionId]);

  const handlePositionChange = e => {
    setSelectedPosition(e.currentTarget.value);
    setSelectedPositionId(e.currentTarget.id);
  };

  return positions.map(({ id, name }) => (
    <label key={id}>
      <Field
        id={id}
        type="radio"
        name={name}
        value={name}
        checked={selectedPosition === name}
        onChange={handlePositionChange}
      />
      {name}
    </label>
  ));
};

export default Positions;
