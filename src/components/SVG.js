import { icons } from '../assets/icons';

const Icon = ({ icon, toggleEditMode }) => {
  return (
    <div style={{ marginRight: '7px' }} onClick={toggleEditMode}>
      {icons[icon]}
    </div>
  );
};

export default Icon;
