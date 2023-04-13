import './styles.css';

const Dropdown = ({ options, id, onSelectValue, selectValue }) => {
  const handleSelect = (e) => {
    onSelectValue(e.target.value);
  };

  return (
    <>
      <select name='languages' id={id} onChange={(e) => handleSelect(e)}>
        {options.map(({ value, label }) => (
          <option key={label} value={value}>
            {label}
          </option>
        ))}
      </select>
      <span>{selectValue}</span>
    </>
  );
};

export default Dropdown;
