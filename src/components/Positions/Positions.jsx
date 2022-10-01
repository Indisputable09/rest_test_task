import { PositionsItem } from 'components/Registration/Registration.styled';
import { Field } from 'formik';
import { useUsers } from 'hooks/UsersContext';
import { useEffect, useState } from 'react';
import { fetchPositions } from 'services/API';

const Positions = ({ handlePositionNumberChange, values }) => {
  const { getPosition } = useUsers();
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
    handlePositionNumberChange(e.currentTarget.id);
  };

  return positions.map(({ id, name }) => (
    <PositionsItem key={id}>
      <Field
        id={id}
        type="radio"
        name="position"
        value={name}
        checked={selectedPosition === name}
        onChange={handlePositionChange}
      />
      {name}
    </PositionsItem>
  ));
};

export default Positions;
