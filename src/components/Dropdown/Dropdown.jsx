import './styles.css';

const Dropdown = ({ attributes, id, onSelectValue }) => {
  const handleSelect = (e) => {
    onSelectValue(e.target.value);
  };

  return (
    <>
      <select name="languages" id={id} onChange={(e) => handleSelect(e)}>
        {attributes.map(({ value, label }) => {
          return (
            <option key={label} value={value}>
              {label}
            </option>
          );
        })}
        ;
      </select>
    </>
  );
};

export default Dropdown;
