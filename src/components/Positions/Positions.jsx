import { useEffect, useState } from 'react';
import {
  CustomRadioButton,
  LabelText,
  PositionsItem,
  RadioButton,
} from './Positions.styled';
import { useUsers } from 'hooks/UsersContext';
import { fetchPositions } from 'services/API';

const Positions = ({ handlePositionValueChange, values }) => {
  // const { getPosition } = useUsers();
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

  // useEffect(() => {
  //   getPosition(+selectedPositionId);
  // }, [getPosition, selectedPositionId]);

  const handlePositionChange = e => {
    setSelectedPosition(e.currentTarget.value);
    setSelectedPositionId(e.currentTarget.id);
    handlePositionValueChange(e.currentTarget.id);
  };

  return positions.map(({ id, name }) => (
    <PositionsItem key={id}>
      <RadioButton
        id={id}
        type="radio"
        name="position"
        value={name}
        checked={selectedPosition === name}
        onChange={handlePositionChange}
      />
      <CustomRadioButton></CustomRadioButton>
      <LabelText>{name}</LabelText>
    </PositionsItem>
  ));
};

export default Positions;
