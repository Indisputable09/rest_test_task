import { useEffect, useState } from 'react';
import {
  CustomRadioButton,
  LabelText,
  PositionsItem,
  RadioButton,
} from './Positions.styled';
import { fetchPositions } from 'services/API';

const Positions = ({ handleChange }) => {
  const [positions, setPositions] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState('');

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

  const handlePositionChange = e => {
    setSelectedPosition(+e.currentTarget.value);
  };

  return positions.map(({ id, name }) => (
    <PositionsItem key={id}>
      <RadioButton
        id={id}
        type="radio"
        name="position"
        value={id}
        checked={selectedPosition === id}
        onChange={e => {
          handleChange(e);
          handlePositionChange(e);
        }}
      />
      <CustomRadioButton></CustomRadioButton>
      <LabelText>{name}</LabelText>
    </PositionsItem>
  ));
};

export default Positions;
